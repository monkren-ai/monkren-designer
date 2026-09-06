import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { WorkbenchPage } from './pages/WorkbenchPage';
import { DesignersPage } from './pages/DesignersPage';
import { SkillsPage } from './pages/SkillsPage';
import { AccountPage } from './pages/AccountPage';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="workbench" element={<WorkbenchPage />} />
        <Route path="designers" element={<DesignersPage />} />
        <Route path="skills" element={<SkillsPage />} />
        <Route path="account" element={<AccountPage />} />
      </Route>
    </Routes>
  );
};
