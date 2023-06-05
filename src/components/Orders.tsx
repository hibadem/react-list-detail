import React from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { Product } from '../types/Product';
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '../store/reducers';

const Orders = () => {
  const basketProducts = useSelector((state: any) => state.basket.products);
  const dispatch = useDispatch();
  const handleMinusClick = (id: string) => {
    dispatch(removeFromBasket(id))
  }
  const handlePlusClick = (item: Product) => {
    dispatch(addToBasket(item))
  }
  return (
    <div className="hidden md:block p-4">
      <Sidebar title="Cart" >
        <div className="cart-items p-4">
          {basketProducts.map((basketProduct: any) => (
          <div className="cart-item flex justify-between">
            <div className="cart-item-left">
              <div className="text-xs">{basketProduct.item.name}</div>
              <div className="text-[10px] text-primary">${basketProduct.item.price}</div>
            </div>
            <div className="cart-item-right leading-none">
              <div className="flex justify-between items-center gap-2.5 rounded-lg relative bg-transparent mt-1">
                <button onClick={() => handleMinusClick(basketProduct.item.id)} className="shadow-md p-1 bg-gray-50 text-primary hover:text-gray-700 hover:bg-gray-400 rounded-l cursor-pointer outline-none">
                  <span className="m-auto text-sm">−</span>
                </button>
                <span className='text-sm'>{basketProduct.count}</span>
                <button onClick={() => handlePlusClick(basketProduct.item)} className="shadow-md p-1 bg-gray-50 text-primary hover:text-gray-700 hover:bg-gray-400  rounded-r cursor-pointer">
                  <span className="m-auto text-sm">+</span>
                </button>
              </div>
            </div>
          </div>
          )
        )}
        </div>
      </Sidebar>
      </div>
  )
}

export default Orders