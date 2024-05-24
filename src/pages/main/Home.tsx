import React from 'react';
import Topbar from '../../components/molecules/Topbar';
import { Alarm } from '../../components/molecules/Alarm';
import { ChoiceMenu } from '../../components/ChoiceMenu';
export const Home = () => {
  return (
    <>
      <Alarm message='=dd' />
      <Topbar title='적금가입' />
    </>
  );
};
