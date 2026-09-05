import path from 'node:path';
import fs from 'node:fs/promises';
import type { Run, RunLogEntry, RunResult, Project } from './types.js';

export interface ToolContext {
  projectRoot: string;
}

export class ToolExecutionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ToolExecutionError';
  }
}

/**
 * Path Jail: ensure any file accessed by tool is strictly inside projectRoot
 */
export function resolveJailedPath(projectRoot: string, relativeOrAbsolutePath: string): string {
  // Normalize root path
  const root = path.resolve(projectRoot);
  // If path is absolute (starts with / on POSIX or drive on Windows), check if it starts with root
  let resolved: string;
  if (path.isAbsolute(relativeOrAbsolutePath)) {
    resolved = path.resolve(relativeOrAbsolutePath);
  } else {
    resolved = path.resolve(root, relativeOrAbsolutePath);
  }

  // Security invariant: resolved path must strictly start with root + sep or equal root
  if (resolved !== root && !resolved.startsWith(root + path.sep)) {
    throw new ToolExecutionError(
      `Path jail violation: Attempted access to '${relativeOrAbsolutePath}' which resolves outside project root '${projectRoot}'`
    );
  }

  return resolved;
}

/**
 * Standard Harness Tool: repo.read_file with Path Jail
 */
export async function toolRepoReadFile(projectRoot: string, filePath: string): Promise<string> {
  const safePath = resolveJailedPath(projectRoot, filePath);
  try {
    const stat = await fs.stat(safePath);
    if (!stat.isFile()) {
      throw new ToolExecutionError(`Target path '${filePath}' is not a regular file`);
    }
    const content = await fs.readFile(safePath, 'utf8');
    return content;
  } catch (err: any) {
    if (err instanceof ToolExecutionError) throw err;
    throw new ToolExecutionError(`Failed to read file '${filePath}': ${err.message}`);
  }
}

export type RunEventCallback = (
  event: 'run.started' | 'run.token' | 'run.finished' | 'run.failed',
  payload: any
) => void;

/**
 * Deterministic Fixture Designer Engine (M2 scaffold)
 *
 * Simulates a deterministic AI designer agent generating design artifacts,
 * executing tools (repo.read_file inside jailed workspace), streaming tokens,
 * and calling submit_result without requiring live cloud LLM keys in test.
 */
export class AgentHarness {
  private activeRuns = new Map<string, { abortController: AbortController }>();

  constructor(private projectRoot: string = process.cwd()) {}

  /**
   * Cancel an active Run
   */
  cancelRun(runId: string): boolean {
    const active = this.activeRuns.get(runId);
    if (active) {
      active.abortController.abort();
      this.activeRuns.delete(runId);
      return true;
    }
    return false;
  }

  /**
   * Execute a deterministic fixture run loop
   */
  async executeRun(
    run: Run,
    project: Project,
    onEvent?: RunEventCallback
  ): Promise<Run> {
    const abortController = new AbortController();
    this.activeRuns.set(run.id, { abortController });

    const emitLog = (entry: RunLogEntry) => {
      run.logs.push(entry);
      if (entry.type === 'token') {
        onEvent?.('run.token', { runId: run.id, token: entry.content, timestamp: entry.timestamp });
      }
    };

    run.status = 'running';
    run.startedAt = new Date().toISOString();
    emitLog({
      type: 'system',
      content: `[Harness] Run started with executor: ${run.executorDesignerId} on project: ${project.name}`,
      timestamp: new Date().toISOString(),
    });
    onEvent?.('run.started', { runId: run.id, run, timestamp: run.startedAt });

    const isAborted = () => abortController.signal.aborted;

    try {
      // Step 1: Simulate thought & token streaming
      const tokens = [
        'Analyzing ',
        'TaskGraph ',
        'specifications ',
        'and ',
        'industrial ',
        'monochrome ',
        'tokens...\n',
      ];

      for (const t of tokens) {
        if (isAborted()) throw new Error('Run was cancelled by user');
        emitLog({ type: 'token', content: t, timestamp: new Date().toISOString() });
        // small deterministic tick
        await new Promise((r) => setTimeout(r, 15));
      }

      // Step 2: Tool execution - repo.read_file (Path Jailed)
      const targetDoc = 'README.md';
      emitLog({
        type: 'tool_call',
        content: `call: repo.read_file({ path: "${targetDoc}" })`,
        timestamp: new Date().toISOString(),
      });

      let fileSnippet = '';
      try {
        const fileContent = await toolRepoReadFile(this.projectRoot, targetDoc);
        fileSnippet = fileContent.slice(0, 120).replace(/\n/g, ' ');
        emitLog({
          type: 'tool_result',
          content: `result: 200 OK (${fileContent.length} bytes read). Snippet: "${fileSnippet}..."`,
          timestamp: new Date().toISOString(),
        });
      } catch (toolErr: any) {
        emitLog({
          type: 'tool_result',
          content: `error: ${toolErr.message}`,
          timestamp: new Date().toISOString(),
        });
      }

      if (isAborted()) throw new Error('Run was cancelled by user');

      // Step 3: Stream synthesis tokens
      const synthTokens = [
        'Synthesizing ',
        'verified ',
        'AIOS ',
        'component ',
        'spec ',
        'aligned ',
        'with ',
        'aios-ui-kit...\n',
      ];
      for (const st of synthTokens) {
        if (isAborted()) throw new Error('Run was cancelled by user');
        emitLog({ type: 'token', content: st, timestamp: new Date().toISOString() });
        await new Promise((r) => setTimeout(r, 15));
      }

      // Step 4: submit_result
      const result: RunResult = {
        summary: `Deterministic specification synthesized for node '${run.nodeId || 'default'}' using aios-ui-kit under executor '${run.executorDesignerId}'. Read baseline from '${targetDoc}'.`,
        artifacts: [
          {
            name: `${run.nodeId || 'spec'}.component.tsx`,
            path: `components/${run.nodeId || 'spec'}.tsx`,
            content: `// AIOS Designer Deterministic Artifact\nexport const Spec = () => <div className="p-4 bg-black text-rose-500 font-mono">Synthesized Spec</div>;\n`,
          },
        ],
      };

      emitLog({
        type: 'tool_call',
        content: `call: submit_result(${JSON.stringify({ summary: result.summary })})`,
        timestamp: new Date().toISOString(),
      });

      run.status = 'completed';
      run.result = result;
      run.finishedAt = new Date().toISOString();

      emitLog({
        type: 'system',
        content: `[Harness] Run completed successfully at ${run.finishedAt}`,
        timestamp: run.finishedAt,
      });

      onEvent?.('run.finished', { runId: run.id, run, result, timestamp: run.finishedAt });
      return run;
    } catch (err: any) {
      const isCancelled = abortController.signal.aborted;
      run.status = isCancelled ? 'cancelled' : 'failed';
      run.error = err.message || 'Run execution failed';
      run.finishedAt = new Date().toISOString();

      emitLog({
        type: 'system',
        content: `[Harness] Run ${run.status}: ${run.error}`,
        timestamp: run.finishedAt,
      });

      onEvent?.('run.failed', {
        runId: run.id,
        run,
        error: run.error,
        cancelled: isCancelled,
        timestamp: run.finishedAt,
      });
      return run;
    } finally {
      this.activeRuns.delete(run.id);
    }
  }
}
