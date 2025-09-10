import React from "react";
import "./about.css";
import { Banner } from "../common";
import about1 from "../assets/img/about/about_1.jpg";
import about2 from "../assets/img/about/about_2.jpg";
import banner1 from "../assets/img/banner/banner_3.jpg";
import banner2 from "../assets/img/banner/banner_4.jpg";

const About = () => {
  const banners = [banner1, banner2];
  const titles = [
    "India's Best Online Marketplace For Cattle Trading",
    "Wide Range of Verified Cattle",
  ];

  return (
    <main className="about_section">
      <Banner banners={banners} titles={titles} />

      <div className="content_section">
        <div className="content_container">
          <img className="about_img" src={about1} />
          <div className="text_container">
            <h4 className="text-body-secondary fw-bold">
              Bringing the Next White Revolution
            </h4>
            <p className="about_info mt-2 text-justify">
              Kowmart is an online marketplace established with the aim to
              improve the lives of dairy farmers in a meaningful way by making
              dairy farming significantly more profitable and it has created
              innovative digital solutions for cattle farmers to buy and sell
              cattles via online and damn sure that we are going to
              revolutionize the cattle industry in India as soon as possible.
            </p>
          </div>
        </div>
        <div className="content_container">
          <div className="text_container">
            <h4 className="text-body-secondary fw-bold">We have a Dream</h4>
            <p className="about_info mt-2 text-justify">
              Our dream is to build the largest digital platform for cattle
              trading in India. We are working towards bringing the next White
              Revolution by making dairy farming meaningfully profitable. To
              achieve our goal, we are focusing on leveraging the latest
              technologies such as artificial intelligence, blockchain, and data
              analytics to provide a seamless trading experience for cattle
              owners, dairy farmers, and other stakeholders in the dairy
              industry.
            </p>
          </div>
          <img className="about_img" src={about2} />
        </div>
      </div>
    </main>
  );
};
export default About;
