import React from "react";

const NewsLetterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 10% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto libero
        quo ex quisquam possimus aspernatur eum aperiam ut tempora qui
        consequatur laborum error, omnis laudantium distinctio aut voluptate
        magni praesentium!
      </p>
      <form
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
        onSubmit={onSubmitHandler}
      >
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="enter your email"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
