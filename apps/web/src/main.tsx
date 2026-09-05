import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import * as motion from 'motion/react';
import { ConfigProvider } from 'aios-ui-kit';
import { DaemonProvider } from './context/DaemonContext';
import { App } from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider motion={motion as any} defaultTheme="dark" enableSystem>
      <DaemonProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DaemonProvider>
    </ConfigProvider>
  </React.StrictMode>
);
