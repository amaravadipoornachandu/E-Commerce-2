import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          alt=""
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-6">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit
            harum in at dignissimos doloremque? Voluptatem praesentium repellat
            doloremque delectus, obcaecati pariatur ex, ducimus corrupti minima
            quas reprehenderit ad placeat sed!
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores,
            esse. Beatae eum dolorem saepe dolor! Quisquam quae, dolorum beatae
            totam adipisci, repudiandae officiis harum sed aperiam voluptatibus
            fuga debitis non?
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, odio
            cum voluptates provident sit quis dolorum sunt, modi inventore
            mollitia laboriosam optio maiores quo vel est ipsam quidem excepturi
            exercitationem.
          </p>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  );
};

export default About;
