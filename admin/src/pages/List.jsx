import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
        // toast.success("Products fetched successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch products");
      console.error(error);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error in removeProduct:", error);
      toast.error("Failed to remove product");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">All Products List</h2>

      {/* Table Header */}
      <div className="grid grid-cols-5 font-semibold border-b-2 py-2 px-4 bg-gray-100 text-sm">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Action</p>
      </div>

      {/* Product List */}
      {list.length > 0 ? (
        list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-5 items-center py-3 px-4 border-b text-sm hover:bg-gray-50 transition"
          >
            <img
              src={item.image[0]}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <button
              onClick={() => removeProduct(item._id)}
              className="text-red-300 hover:text-red-400 font-bold text-lg"
              title="Delete Product"
            >
              ✕
            </button>
          </div>
        ))
      ) : (
        <p className="text-center py-6 text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default List;
