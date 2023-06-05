import React from 'react'
import { Product } from '../types/Product'
import { useParams } from 'react-router-dom'
import Orders from './Orders'
import AddToBasketButton from './AddToBasket'


interface IProductDetail {
  products: Product[]
}

const ProductDetail:React.FC<IProductDetail> = ({products}) => {
  const {id} = useParams();

  const product = products.find(product => product.id == id);
  if (!product) {
    return <div>Ürün bulunamadı</div>;
  }

  return (
    <div className='flex'>
      <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-2.5 shadow-md">
        <div className="left">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="flex flex-col gap-2.5">
          <div className='text-2xl'>{product.name}</div>
          <div className='text-2xl text-primary'>€{product.price}</div>
          <AddToBasketButton product={product}/>
          <div>{product.description}</div>
        </div>
      </div>
      <Orders />
    </div>
  );
}

export default ProductDetail