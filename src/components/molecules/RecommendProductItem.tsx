import { FC } from 'react';
import { RecommendList } from '../organisms/RecommendProductList';
import { useNavigate } from 'react-router-dom';

interface IProps {
  item: RecommendList;
}

export const RecommendProductItem: FC<IProps> = ({ item }) => {
  const navigate = useNavigate();

  const moveProductDetail = (productId: number) => {
    navigate('/mission4/product', { state: { productId: productId } });
  };

  return (
    <div
      className='flex justify-between items-end cursor-pointer'
      onClick={() => moveProductDetail(item.id)}
    >
      <div className='flex flex-col gap-3'>
        <h3 className='font-hanaBold text-2xl'>{item.title}</h3>
        <p className='font-hanaRegular text-xl text-[#838383]'>
          {item.subTitle}
        </p>
      </div>
      <div className='flex flex-col items-end justify-center gap-1'>
        <p className='font-hanaRegular text-[#838383] text-base'>
          연(세전,{item.year}년)
        </p>
        <p className='font-hanaBold text-hanaGreen text-xl'>
          {item.low_interest}%~
          <span className='font-hanaHeavy'>{item.high_interest}%</span>
        </p>
      </div>
    </div>
  );
};
