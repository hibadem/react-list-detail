import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

interface BasketState {
  products: BasketProduct[],
  total_amount: number
}

type BasketProduct = {
  count: number,
  item: Product
}

const initialState: BasketState = {
  products: [],
  total_amount: 0
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state = initialState, action: PayloadAction<Product>) => {
      const existingProductIndex = state.products.findIndex(product => product.item.id === action.payload.id);

      if (existingProductIndex !== -1) {
        state.products[existingProductIndex].count++;
      } else {
        state.products.push({ item: action.payload, count: 1 });
      }

      state.total_amount += parseFloat(action.payload.price);
     
    },
    removeFromBasket: (state = initialState, action: PayloadAction<string>) => {
      const existingProductIndex = state.products.findIndex(product => product.item.id === action.payload);

      if (state.products[existingProductIndex].count > 1) {
        state.products[existingProductIndex].count--;
        state.total_amount -= parseFloat(state.products[existingProductIndex].item.price);
      } else {
        state.products = state.products.filter(product => product.item.id !== action.payload);
        state.total_amount -= parseFloat(state.products[existingProductIndex].item.price);
      }
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;
export default basketSlice.reducer;
