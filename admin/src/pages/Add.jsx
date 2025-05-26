import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const toggleSize = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (sizes.length === 0) {
      toast.error("Please select at least one size");
      return;
    }

    const formData = new FormData();
    images.forEach((img, i) => {
      if (img && img instanceof File) {
        formData.append(`image${i + 1}`, img);
      }
    });

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("bestseller", bestseller);
    formData.append("sizes", JSON.stringify(sizes));

    try {
      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token,
        },
      });

      toast.success(response.data.message || "Product added successfully");

      // Reset form
      setImages([null, null, null, null]);
      setName("");
      setDescription("");
      setPrice("");
      setCategory("Men");
      setSubCategory("Topwear");
      setBestseller(false);
      setSizes([]);
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Failed to upload product.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md space-y-6"
      >
        {/* Upload Images */}
        <div>
          <p className="text-lg font-semibold mb-3">Upload images</p>
          <div className="flex gap-4">
            {[0, 1, 2, 3].map((i) => (
              <label
                key={i}
                htmlFor={`image${i}`}
                className="cursor-pointer border-2 border-dashed border-gray-300 rounded-md w-24 h-24 flex items-center justify-center hover:border-blue-500 transition relative overflow-hidden"
              >
                {images[i] ? (
                  <img
                    src={
                      typeof images[i] === "string"
                        ? images[i]
                        : URL.createObjectURL(images[i])
                    }
                    alt={`uploaded-${i}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={assets.upload_area}
                    alt="upload area"
                    className="w-12 h-12 object-contain"
                  />
                )}
                <input
                  type="file"
                  id={`image${i}`}
                  hidden
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, i)}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div>
          <p className="text-lg font-semibold mb-2">Product Name</p>
          <input
            type="text"
            placeholder="Enter product name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Product Description */}
        <div>
          <p className="text-lg font-semibold mb-2">Product Description</p>
          <input
            type="text"
            placeholder="Write content here..."
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Category, Sub-category, Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-lg font-semibold mb-2">Product Category</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className="text-lg font-semibold mb-2">Sub Category</p>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <p className="text-lg font-semibold mb-2">Product Price</p>
            <input
              type="number"
              placeholder="25"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Product Sizes */}
        <div>
          <p className="text-lg font-semibold mb-3">Product Sizes</p>
          <div className="flex gap-4 flex-wrap">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 border rounded-full text-sm font-medium cursor-pointer transition ${
                  sizes.includes(size)
                    ? "bg-blue-500 text-white border-blue-500"
                    : "border-gray-300 text-gray-700 hover:bg-blue-100"
                }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        {/* Bestseller Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="bestseller"
            className="accent-blue-500 w-4 h-4"
            checked={bestseller}
            onChange={(e) => setBestseller(e.target.checked)}
          />
          <label htmlFor="bestseller" className="text-sm font-medium text-gray-700">
            Add to Bestseller
          </label>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition font-semibold"
          >
            ADD
          </button>
        </div>
      </form>
    </>
  );
};

export default Add;
