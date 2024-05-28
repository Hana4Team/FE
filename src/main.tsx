import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Landing } from './pages/Landing.tsx';
import { Home } from './pages/main/Home.tsx';
import Navbar from './components/Navbar.tsx';
import { MoneyBox } from './pages/moneyBox/MoneyBox.tsx';
import { Sending } from './pages/moneyBox/Sending.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'sending', element: <Sending /> },
      {
        element: <Navbar />,
        children: [
          { path: 'home', element: <Home /> },
          { path: 'moneyBox', element: <MoneyBox /> },
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
