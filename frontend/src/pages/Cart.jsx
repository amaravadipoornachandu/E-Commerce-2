import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity ,navigate} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="text-2xl mb-6">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left side: Cart items */}
        <div className="flex-1 space-y-6">
          {cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );
            if (!productData) return null;

            return (
              <div
                key={index}
                className="py-4 border-b text-gray-700 grid grid-cols-[4fr_1fr_0.5fr] items-center gap-4"
              >
                {/* Product Info */}
                <div className="flex items-center gap-6">
                  <img
                    className="w-16 h-16 object-cover rounded-md"
                    src={productData.image[0]}
                    alt={productData.name}
                  />
                  <div>
                    <p className="text-sm font-semibold">{productData.name}</p>
                    <div className="flex items-center gap-4 mt-1 text-gray-600">
                      <p className="font-medium">{currency}{productData.price}</p>
                      <p className="px-2 py-0.5 border rounded text-xs bg-gray-100 select-none">
                        Size: {item.size}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quantity Input */}
                <input
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  className="border w-16 sm:w-20 px-2 py-1 text-center rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(item._id, item.size, Number(e.target.value))
                  }
                />

                {/* Remove Icon */}
                <img
                  className="w-5 h-5 cursor-pointer hover:text-red-600"
                  src={assets.bin_icon}
                  alt="Remove"
                  title="Remove item"
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                />
              </div>
            );
          })}
        </div>

        {/* Right side: Cart total + checkout button below */}
        <div className="w-full lg:w-96 self-start flex flex-col items-center gap-6">
          <CartTotal />
          <button onClick={()=>navigate('/place-order')} className="bg-black text-white text-xs px-10 py-4 rounded">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
