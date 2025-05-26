import React from "react";
import NewsLetterBox from "../components/NewsLetterBox";

const Contact = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md mt-10 text-center">
      <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
      <p className="mb-4 text-lg">
        We'd love to hear from you! Reach out to us through any of the following:
      </p>

      <div className="space-y-4 text-left max-w-md mx-auto">
        <div>
          <h3 className="font-semibold text-xl">Address</h3>
          <p>123 Main Street, Suite 456<br />Cityname, State, 12345</p>
        </div>

        <div>
          <h3 className="font-semibold text-xl">Phone</h3>
          <p>+1 (555) 123-4567</p>
        </div>

        <div>
          <h3 className="font-semibold text-xl">Email</h3>
          <p>contact@website.com</p>
        </div>

        <div>
          <h3 className="font-semibold text-xl">Office Hours</h3>
          <p>Monday - Friday: 9:00 AM to 6:00 PM</p>
          <p>Saturday - Sunday: Closed</p>
        </div>
      </div>
      <br />
      <NewsLetterBox/>
    </div>
  );
};

export default Contact;
