import React, { useContext, useEffect, useState } from "react";
import "./sell.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context.jsx";
import { Alert } from "../styles.jsx";
import categoryIcon from "../assets/img/other/category.png";
import breedIcon from "../assets/img/other/breed.png";
import infoIcon from "../assets/img/other/info.png";
import {
  categoryCow,
  categoryBuffalo,
  categoryGoat,
  categorySheep,
  categoryOx,
} from "../assets/img/cattles/categories";
import {
  girCow,
  redSindhiCow,
  kankrejCow,
  jerseyCow,
  rathiHeiferCow,
  kapilaCow,
  vilwadriCow,
  hfCow,
  tharparkarCow,
  sahiwalCow,
  deoniCow,
} from "../assets/img/cattles/breeds/cow";
import {
  surtiBuffalo,
  niliBuffalo,
  banniBuffalo,
  murrahBuffalo,
  jafarabadiBuffalo,
} from "../assets/img/cattles/breeds/buffalo";
import {
  malabariGoat,
  sirohiGoat,
  kotaGoat,
  beetalGoat,
  sannenGoat,
  jamunapariGoat,
  boerGoat,
  sojatGoat,
  barbariGoat,
  gujriGoat,
  jakhranaGoat,
} from "../assets/img/cattles/breeds/goat";
import {
  bannurSheep,
  neeloreJodipiSheep,
  sindhanoorSheep,
  deccaniSheep,
  coimbatoreSheep,
} from "../assets/img/cattles/breeds/sheep";
import { ongoleOx, brahmaOx } from "../assets/img/cattles/breeds/ox";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import SellForm from "./SellForm.jsx";

const Sell = () => {
  const { currentUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    message: "",
    color: "",
  });
  const [category, setCategory] = useState("");
  const [breed, setBreed] = useState("");
  const categoryList = [
    { name: "Cow", img: categoryCow },
    { name: "Buffalo", img: categoryBuffalo },
    { name: "Goat", img: categoryGoat },
    { name: "Sheep", img: categorySheep },
    { name: "Ox", img: categoryOx },
  ];
  const breedList = {
    cow: [
      { name: "Gir", img: girCow },
      { name: "Red Sindhi", img: redSindhiCow },
      { name: "Kankrej", img: kankrejCow },
      { name: "Jersey", img: jerseyCow },
      { name: "Rathi Heifer", img: rathiHeiferCow },
      { name: "Kapila", img: kapilaCow },
      { name: "Vilwadri", img: vilwadriCow },
      { name: "HF", img: hfCow },
      { name: "Tharparkar", img: tharparkarCow },
      { name: "Sahiwal", img: sahiwalCow },
      { name: "Deoni", img: deoniCow },
    ],
    buffalo: [
      { name: "Surti", img: surtiBuffalo },
      { name: "Nili", img: niliBuffalo },
      { name: "Banni", img: banniBuffalo },
      { name: "Murrah", img: murrahBuffalo },
      { name: "Jafarabadi", img: jafarabadiBuffalo },
    ],
    goat: [
      { name: "Malabari", img: malabariGoat },
      { name: "Sirohi", img: sirohiGoat },
      { name: "Kota", img: kotaGoat },
      { name: "Beetal", img: beetalGoat },
      { name: "Sannen", img: sannenGoat },
      { name: "Jamunapari", img: jamunapariGoat },
      { name: "Boer", img: boerGoat },
      { name: "Sojat", img: sojatGoat },
      { name: "Barbari", img: barbariGoat },
      { name: "Gujri", img: gujriGoat },
      { name: "Jakhrana", img: jakhranaGoat },
    ],
    sheep: [
      { name: "Bannur", img: bannurSheep },
      { name: "Neelore Jodipi", img: neeloreJodipiSheep },
      { name: "Sindhanoor", img: sindhanoorSheep },
      { name: "Deccani", img: deccaniSheep },
      { name: "Coimbatore", img: coimbatoreSheep },
    ],
    ox: [
      { name: "Ongole", img: ongoleOx },
      { name: "Brahma", img: brahmaOx },
    ],
  };

  const formIcon = breed ? infoIcon : category ? breedIcon : categoryIcon;

  useEffect(() => {
    if (!currentUser) {
      setAlertInfo({
        show: true,
        message: "Unauthorized access. Redirecting to login page...",
        color: "danger",
      });
      setTimeout(() => navigate("/login?user=customer"), 1500);
    }
  }, []);

  return (
    <main className="py-4 sell_section">
      <Alert isOpen={alertInfo.show} color={alertInfo.color} role="alert">
        {alertInfo.message}
      </Alert>

      {currentUser && (
        <>
          <div className="d-flex flex-column align-items-center">
            <p className="title1">List Your LiveStock Here</p>
            <p className="title2">Buy and Sell your Cattles easier!</p>
            <img className="choose" src={formIcon} alt="icon" />
            <Breadcrumb listTag="div" className="mt-2">
              <BreadcrumbItem
                tag="a"
                active={category ? false : true}
                className={category ? "pointer" : ""}
                onClick={() => {
                  setBreed("");
                  setCategory("");
                }}
              >
                Category
              </BreadcrumbItem>
              {category && (
                <BreadcrumbItem
                  tag="a"
                  active={breed ? false : true}
                  className={breed ? "pointer" : ""}
                  onClick={() => setBreed("")}
                >
                  Breed
                </BreadcrumbItem>
              )}
              {breed && (
                <BreadcrumbItem tag="a" active={breed ? true : false}>
                  Detail
                </BreadcrumbItem>
              )}
            </Breadcrumb>
          </div>
          {breed ? (
            <SellForm category={category} breed={breed} />
          ) : (
            <div className="list_container">
              {category
                ? breedList[category].map((e, index) => (
                    <Card
                      key={index}
                      name={e.name}
                      img={e.img}
                      handleClick={() => setBreed(e.name.toLocaleLowerCase())}
                    />
                  ))
                : categoryList.map((e, index) => (
                    <Card
                      key={index}
                      name={e.name}
                      img={e.img}
                      handleClick={() =>
                        setCategory(e.name.toLocaleLowerCase())
                      }
                    />
                  ))}
            </div>
          )}
        </>
      )}
    </main>
  );
};

const Card = ({ name, img, handleClick }) => {
  return (
    <div className="category" onClick={handleClick}>
      <img className="category_img" src={img} />
      <p className="text-center mt-2">{name}</p>
    </div>
  );
};

export default Sell;
