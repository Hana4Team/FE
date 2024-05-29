import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Landing } from './pages/Landing.tsx';
import { Home } from './pages/main/Home.tsx';
import { Join } from './pages/auth/Join.tsx';
import { Login } from './pages/auth/Login.tsx';
import Navbar from './components/Navbar.tsx';
import { Mission2StartPage } from './pages/mission2/Mission2StartPage.tsx';
import { Mission3StartPage } from './pages/mission3/Mission3StartPage.tsx';
import { Mission4StartPage } from './pages/mission4/Mission4StartPage.tsx';
import { Mission5StartPage } from './pages/mission5/Mission5StartPage.tsx';
import { JoinProductPage } from './pages/JoinProductPage.tsx';
import { MoneyBox } from './pages/moneyBox/MoneyBox.tsx';
import { Sending } from './pages/moneyBox/Sending.tsx';
import { MyPage } from './pages/main/MyPage.tsx';
import { AlarmPage } from './pages/main/AlarmPage.tsx';
import { Mission2AccountOpening } from './pages/mission2/Mission2AccountOpening.tsx';

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
        path: 'mission2/account-opening',
        element: <Mission2AccountOpening />,
      },
      {
        element: <Navbar />,
        children: [
          { path: 'home', element: <Home /> },
          { path: 'mission2', element: <Mission2StartPage /> },
          { path: 'mission3', element: <Mission3StartPage /> },
          { path: 'mission4', element: <Mission4StartPage /> },
          { path: 'mission5', element: <Mission5StartPage /> },
          { path: 'joinProduct', element: <JoinProductPage /> },
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
