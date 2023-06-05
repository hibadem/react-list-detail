import React from 'react';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../store/reducers';
import { Product } from '../types/Product';


const AddToBasketButton: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToBasket = () => {
    dispatch(addToBasket(product));
  };

  return (
    <button className='bg-primary text-white py-2 px-4 rounded w-full' onClick={handleAddToBasket}>Add to Cart</button>
  );
};

export default AddToBasketButton;
