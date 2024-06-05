import { FC } from 'react';
import { BsArrowRightCircleFill } from 'react-icons/bs';
import { RecommendProductItem } from '../molecules/RecommendProductItem';
import { useNavigate } from 'react-router-dom';
import { ProductsType } from '../../types/products';

interface IProps {
  list: ProductsType[];
}

export const RecommendProductList: FC<IProps> = ({ list }) => {
  const navigate = useNavigate();

  return (
    <div className='w-11/12 bg-white py-10 px-10 rounded-3xl m-auto'>
      <div className='flex justify-between items-end'>
        <div className='flex flex-col gap-3'>
          <p className='font-hanaLight text-2xl'>{list[0].title}</p>
          <h2 className='font-hanaBold text-4xl'>{list[0].name}</h2>
          <BsArrowRightCircleFill
            color={'#D9D9D9'}
            size={24}
            className='mb-24 cursor-pointer'
            onClick={() =>
              navigate(`/product?productId=${list[0].productsId}&mission=4`)
            }
          />
        </div>
        <img src='icons/dollar_circle.svg' alt='dollar' className='w-36 mb-5' />
      </div>
      <hr className='mt-5 mb-10' />
      <div className='flex flex-col justify-center gap-10'>
        {list.map(
          (item, index) =>
            index > 0 && <RecommendProductItem key={index} item={item} />
        )}
      </div>
    </div>
  );
};
