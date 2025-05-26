import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

const statusHandler=async (e,orderId)=>{
  try {
    const response=await axios.post(backendUrl+"/api/order/status",{orderId,status:e.target.value},{headers:{token}});
    if(response.data.success){
      await fetchAllOrders();
    }
  } catch (err) {
    console.error("Error fetching orders in statusHandler function:", err);
    
  }
}



  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-4">Order Page</h3>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-5 flex flex-col gap-4 md:flex-row md:justify-between"
          >
            {/* Left - Parcel Icon and Items */}
            <div className="flex gap-4">
              <img src={assets.parcel_icon} alt="parcel" className="w-16 h-16" />
              <div className="space-y-1">
                <div className="text-gray-700 text-sm">
                  {order.items.map((item, i) => (
                    <p key={i}>
                      {item.name} x {item.quantity}{" "}
                      <span className="text-gray-500">({item.size})</span>
                      {i !== order.items.length - 1 && ","}
                    </p>
                  ))}
                </div>
                <p className="font-medium mt-2">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="text-gray-600 text-sm">
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city}, {order.address.state},{" "}
                    {order.address.zipcode}, {order.address.country}
                  </p>
                </div>
                <p className="text-gray-600">{order.address.phone}</p>
              </div>
            </div>

            {/* Right - Order Info */}
            <div className="flex flex-col gap-2 items-start md:items-end">
              <div className="text-sm text-gray-700">
                <p>Items: {order.items.length}</p>
                <p>Method: {order.paymentMethod}</p>
                <p>
                  Payment:{" "}
                  <span
                    className={
                      order.payment ? "text-green-600 font-medium" : "text-red-600"
                    }
                  >
                    {order.payment ? "Done" : "Pending"}
                  </span>
                </p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className="text-lg font-bold mt-2">
                {currency}
                {order.amount}
              </p>
              <select onChange={(e)=>statusHandler(e,order._id)} value={order.status} className="border rounded-md px-3 py-1 text-sm bg-gray-50">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
