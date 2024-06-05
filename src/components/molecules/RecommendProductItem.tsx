import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductsType } from '../../types/products';

interface IProps {
  item: ProductsType;
}

export const RecommendProductItem: FC<IProps> = ({ item }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const moveProductDetail = (productId: number) => {
    navigate(`${location.pathname}/product`, {
      state: { productId: productId },
    });
  };

  return (
    <div
      className='flex justify-between items-end cursor-pointer'
      onClick={() => moveProductDetail(item.productsId)}
    >
      <div className='flex flex-col gap-3'>
        <h3 className='font-hanaBold text-2xl'>{item.name}</h3>
        <p className='font-hanaRegular text-xl text-[#838383]'>{item.title}</p>
      </div>
      <div className='flex flex-col items-end justify-center gap-1'>
        <p className='font-hanaRegular text-[#838383] text-base'>
          {item.summary}
        </p>
        <p className='font-hanaBold text-hanaGreen text-xl'>
          {item.interest1}%~
          <span className='font-hanaHeavy'>{item.interest2}%</span>
        </p>
      </div>
    </div>
  );
};
