import { createDaemonServer } from './server.js';

const HOST = process.env.AIOS_DAEMON_HOST || '127.0.0.1';
const PORT = Number(process.env.AIOS_DAEMON_PORT) || 7420;

const { server } = createDaemonServer();

server.listen(PORT, HOST, () => {
  console.log(`[AIOS Designer Daemon] Listening on http://${HOST}:${PORT}`);
  console.log(`[AIOS Designer Daemon] Health check: http://${HOST}:${PORT}/health`);
});
