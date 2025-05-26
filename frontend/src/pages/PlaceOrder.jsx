import React, { useState, useContext } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.quantity = cartItems[items][item];
              itemInfo.size = item;
              orderItems.push(itemInfo);
            }
          }
        }
        
      }
      let orderData = {
          address: formData,
          items: orderItems,
          amount: getCartAmount() + delivery_fee,
        };
        switch(method) {
          case "cod":
            const response=await axios.post(backendUrl+"/api/order/place",orderData,{headers:{token}});
            console.log(response);
            if(response.data.success){
              setCartItems({});
              navigate('/orders');
            }
            else
            {
              toast.error(response.data.message);
            }
            break;
            case 'stripe':
               const responseStripe=await axios.post(backendUrl+"/api/order/stripe",orderData,{headers:{token}});
               if(responseStripe.data.success){
                const {session_url}=responseStripe.data;
                window.location.replace(session_url);

               }
               else
               {
                 toast.error(responseStripe.data.message);
               }
          default:
            break;
        }
    } catch (err) {}
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* ..............................................left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px] ">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            placeholder="First Name"
            className="border border-gray-300 py-1.5 px-3 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            placeholder="last Name"
            className="border border-gray-300 py-1.5 px-3 w-full"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          placeholder="email"
          className="border border-gray-300 py-1.5 px-3 w-full"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          placeholder="street"
          className="border border-gray-300 py-1.5 px-3 w-full"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="city"
            className="border border-gray-300 py-1.5 px-3 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="state"
            className="border border-gray-300 py-1.5 px-3 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            type="number"
            placeholder="zipcode"
            className="border border-gray-300 py-1.5 px-3 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            type="text"
            placeholder=" country"
            className="border border-gray-300 py-1.5 px-3 w-full"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="number"
          placeholder="phone number"
          className="border border-gray-300 py-1.5 px-3 w-full"
        />
      </div>
      {/* ................................................right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* ...............................................payment method */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method == "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method == "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                Cash On Delivery
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white text-xs px-10 py-3"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
