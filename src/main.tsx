import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Landing } from './pages/Landing.tsx';
import { Home } from './pages/main/Home.tsx';
import Navbar from './components/Navbar.tsx';
import { Mission2StartPage } from './pages/mission2/Mission2StartPage.tsx';
import { Mission3StartPage } from './pages/mission3/Mission3StartPage.tsx';
import { Mission4StartPage } from './pages/mission4/Mission4StartPage.tsx';
import { Mission5StartPage } from './pages/mission5/Mission5StartPage.tsx';
import { JoinProductPage } from './pages/JoinProductPage.tsx';

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
          { path: 'mission2', element: <Mission2StartPage /> },
          { path: 'mission3', element: <Mission3StartPage /> },
          { path: 'mission4', element: <Mission4StartPage /> },
          { path: 'mission5', element: <Mission5StartPage /> },
          { path: 'joinProduct', element: <JoinProductPage /> },
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
