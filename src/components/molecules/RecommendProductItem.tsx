import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductsType } from '../../types/products';

interface IProps {
  item: ProductsType;
}

export const RecommendProductItem: FC<IProps> = ({ item }) => {
  const navigate = useNavigate();

  const moveProductDetail = (productId: number) => {
    navigate(`/product?productId=${productId}&mission=4`);
  };

  return (
    <div
      className='flex justify-between items-end cursor-pointer'
      onClick={() => moveProductDetail(item.productsId)}
    >
      <div className='flex flex-col gap-3'>
        <h3 className='font-hanaBold text-2xl'>{item.name}</h3>
        <p className='font-hanaRegular text-lg text-[#838383]'>{item.title}</p>
      </div>
      <div className='flex flex-col items-end justify-center gap-1'>
        <p className='font-hanaRegular text-[#838383] text-base'>
          연(세전, 1년)
        </p>
        <p className='font-hanaBold text-hanaGreen text-xl'>
          {item.interest1.toFixed(2)}%~
          <span className='font-hanaHeavy'>{item.interest2.toFixed(2)}%</span>
        </p>
      </div>
    </div>
  );
};
