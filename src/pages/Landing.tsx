import React from 'react';
import { ConfirmCard } from '../components/organisms/ConfirmCard';
import { AlertModal } from '../components/organisms/AlertModal';
import { Home } from './main/Home';

export const Landing = () => {
  return (
    <>
      <AlertModal
        children={<div>1단계 미션 완료</div>}
        onClose={() => alert('ㅎㅇ')}
      />
      <div>gd</div>
    </>
  );
};
