import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Landing } from './pages/Landing.tsx';
import { Home } from './pages/main/Home.tsx';
import Navbar from './components/Navbar.tsx';
import { MyPage } from './pages/main/MyPage.tsx';
import { AlarmPage } from './pages/main/AlarmPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      {
        element: <Navbar />,
        children: [
          { path: 'home', element: <Home /> },
          { path: 'alarm', element: <AlarmPage /> },
          { path: 'my', element: <MyPage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
