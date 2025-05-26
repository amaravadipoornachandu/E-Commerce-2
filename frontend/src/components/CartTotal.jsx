import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="w-full max-w-md mx-auto mt-8 px-4">
      <div className="text-2xl mb-4">
        <Title text1="CART" text2="TOTAL" />
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-700">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency}{subtotal}.00</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency}{delivery_fee}</p>
        </div>
        <hr className="border-t" />
        <div className="flex justify-between font-medium text-base">
          <p>Total</p>
          <p>{currency}{total}.00</p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
