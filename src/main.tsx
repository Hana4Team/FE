import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import { Landing } from './pages/Landing.tsx';
import { Home } from './pages/main/Home.tsx';
import { Join } from './pages/auth/Join.tsx';
import { Login } from './pages/auth/Login.tsx';
import Navbar from './components/Navbar.tsx';
import { MoneyBox } from './pages/moneyBox/MoneyBox.tsx';
import { Sending } from './pages/moneyBox/Sending.tsx';
import { MyPage } from './pages/main/MyPage.tsx';
import { AlarmPage } from './pages/main/AlarmPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'sending', element: <Sending /> },
      { path: 'join', element: <Join /> },
      { path: 'login', element: <Login /> },
      {
        element: <Navbar />,
        children: [
          { path: 'home', element: <Home /> },
          { path: 'moneyBox', element: <MoneyBox /> },
          { path: 'alarm', element: <AlarmPage /> },
          { path: 'mypage', element: <MyPage /> },
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
