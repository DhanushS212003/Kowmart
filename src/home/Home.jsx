import React from "react";
import "./home.css";
import { Banner } from "../common";
import {
  categoryCow,
  categoryBuffalo,
  categoryGoat,
  categorySheep,
  categoryOx,
} from "../assets/img/cattles/categories";
import banner1 from "../assets/img/banner/banner_1.jpg";
import banner2 from "../assets/img/banner/banner_2.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const banners = [banner1, banner2];
  const titles = [
    "Buy or Sell Livestock Online",
    "Most Trusted Livestock Marketplace",
  ];

  return (
    <main className="home_section">
      <div className="category_search_container">
        <div className="search_bar_container">
          <input
            className="border-0 w-100 ps-3"
            style={{ outline: "none" }}
            type="search"
            placeholder="Search Cattles"
            id="search_input"
          />
          <div className="search_icon_container">
            <i className="fa-solid fa-magnifying-glass text-white"></i>
          </div>
        </div>

        <div className="category_list_container">
          {[
            { name: "cow", img: categoryCow },
            { name: "buffalo", img: categoryBuffalo },
            { name: "goat", img: categoryGoat },
            { name: "sheep", img: categorySheep },
            { name: "ox", img: categoryOx },
          ].map(({ name, img }, index) => (
            <div
              className="category_container"
              key={index}
              onClick={() => navigate(`/cattle_list?category=${name}`)}
            >
              <img className="category_img rounded-pill" src={img} alt={name} />
              <p className="mt-2 text-center text-capitalize">{name}</p>
            </div>
          ))}
        </div>
      </div>

      <Banner banners={banners} titles={titles} />
    </main>
  );
};

export default Home;
