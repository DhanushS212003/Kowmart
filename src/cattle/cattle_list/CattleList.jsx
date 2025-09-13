import React, { useContext } from "react";
import { AppContext } from "../../context.jsx";
import CattleCard from "../../cattle/cattle_card/CattleCard.jsx";
import "./cattle_list.css";

const CattleList = () => {
  const { cattlesList } = useContext(AppContext);
  const urlParams = new URLSearchParams(location.search);
  const category = urlParams.get("category");

  return (
    <main>
      <div className="page-container">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="title">All {category}</h2>
          <span className="badge badge_outline">
            {`Total: ${
              cattlesList.filter((e) => e.cattle === category).length
            }`}
          </span>
        </div>
        <div className="cattles_container">
          {cattlesList
            .filter((e) => e.cattle === category)
            .map((e, index) => (
              <CattleCard key={index} cattle={e} onlyStatus={false} />
            ))}
        </div>
      </div>
    </main>
  );
};

export default CattleList;
