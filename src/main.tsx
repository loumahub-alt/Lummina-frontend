import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { App } from './App';
import './index.css';
import { PreloadedContentProvider, getBrowserPreloadedContent } from './context/PreloadedContentContext';

const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PreloadedContentProvider value={getBrowserPreloadedContent()}>
      <RouterProvider router={router} />
    </PreloadedContentProvider>
  </React.StrictMode>,
);
