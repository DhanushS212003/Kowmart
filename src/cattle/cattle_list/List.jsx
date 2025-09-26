import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context.jsx";
import { Alert } from "../../styles.jsx";
import { useNavigate } from "react-router-dom";
import CattleCard from "../../cattle/cattle_card/CattleCard.jsx";
import "./list.css";

const List = () => {
  const navigate = useNavigate();
  const { currentUser, cattlesList } = useContext(AppContext);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setShowAlert(true);
      setTimeout(() => navigate("/login?user=customer"), 1500);
    }
  }, []);

  return (
    <main>
      <Alert isOpen={showAlert} color="danger" role="alert">
        Unauthorized access. Redirecting to login page...
      </Alert>

      {currentUser && (
        <div className="list-container">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="title">My Cattles</h2>
            <span className="badge badge_outline">
              {`Total: ${
                cattlesList.filter((e) => e.userId == currentUser.id).length
              }`}
            </span>
          </div>
          <div className="cattles_container">
            {cattlesList
              .filter((e) => e.userId == currentUser.id)
              .map((e, index) => (
                <CattleCard key={index} cattle={e} onlyStatus={false} />
              ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default List;
