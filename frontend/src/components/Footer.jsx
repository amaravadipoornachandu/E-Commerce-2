import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-40 text-sm">
        <div>
          <img className="mb-5 w-32" src={assets.logo} alt="Logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
            beatae sunt quaerat magnam totam velit minima perferendis suscipit
            vitae. Architecto ipsum, iusto quas voluptas commodi debitis cum.
            Corrupti, est reprehenderit.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="cursor-pointer hover:text-black">Home</li>
            <li className="cursor-pointer hover:text-black">About Us</li>
            <li className="cursor-pointer hover:text-black">Delivery</li>
            <li className="cursor-pointer hover:text-black">Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <address className="not-italic text-gray-600">
            <ul>
              <li>7780747057</li>
              <li>poornachanduamaravadi@gmail.com</li>
            </ul>
          </address>
        </div>
      </div>
      <div>
        <hr className="my-5" />
        <p className="py-5 text-sm text-center text-gray-500">
          &copy; 2025 All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
