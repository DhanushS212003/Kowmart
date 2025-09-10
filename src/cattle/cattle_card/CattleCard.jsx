import React, { useContext } from "react";
import "./cattle_card.css";
import { AppContext } from "../../context";

const CattleCard = ({ cattle, onlyStatus }) => {
  const { currentUser, verifiedCattlesList, rejectedCattlesList } =
    useContext(AppContext);
  const { images, breed, cattle: category, id, cattleId } = cattle;
  const userVerifiedCattlesList = verifiedCattlesList.filter(
    (e) => e.userId == currentUser.id
  );
  const userRejectedCattlesList = rejectedCattlesList.filter(
    (e) => e.userId == currentUser.id
  );

  return (
    <div className="cattle_card">
      <div className="card_image">
        <img src={images[0]} alt={`${breed} ${category}`} />
        <span className="badge badge_filled text-capitalize">{category}</span>
      </div>

      <div className="p-3">
        <div className="d-flex justify-content-between mb-2 pb-sm-1">
          <h2 className="card_title">{`${breed} ${category}`}</h2>
          <span className="badge badge_outline">{id}</span>
        </div>
        {onlyStatus ? (
          (() => {
            const isVerified = userVerifiedCattlesList.find(
              (e) => e.cattleId === cattleId
            );
            const isRejected = userRejectedCattlesList.find(
              (e) => e.cattleId === cattleId
            );
            const { text, className } = isVerified
              ? {
                  text: "Verified",
                  className: "bg-success",
                  icon: "fa-solid fa-circle-check",
                }
              : isRejected
              ? {
                  text: "Rejected",
                  className: "bg-danger",
                  icon: "fa-solid fa-circle-xmark",
                }
              : {
                  text: "Pending",
                  className: "bg-warning",
                  icon: "fa-solid fa-clock",
                };

            return (
              <span
                className={`position-relative top-0 end-0 p-2 badge badge_filled ${className} w-100`}
              >
                {text}
              </span>
            );
          })()
        ) : (
          <>
            <div className="d-flex flex-column row-gap-2">
              {["age", "gender"].map((field) => (
                <div key={field} className="d-flex justify-content-between">
                  <span
                    className="text-capitalize"
                    style={{ color: "var(--bs-gray-700)" }}
                  >
                    {field}
                  </span>
                  <span>
                    {`${cattle[field][0].toUpperCase()}${cattle[field].slice(
                      1
                    )}${field === "age" ? " Year(s)" : ""}`}
                  </span>
                </div>
              ))}
            </div>
            <button className="view_details">View Details</button>
          </>
        )}
      </div>
    </div>
  );
};

export default CattleCard;
