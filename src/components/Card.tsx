import React from "react";
import { UserData } from "./UserData";

const Card: React.FC<{ userData: UserData }> = ({ userData }) => {
  const { admin, firstName, lastName, department, avatar } = userData;

  return (
    <div
      className="card mb-3 card-top"
      style={{ maxWidth: "250px", marginTop: "-25px" }}
    >
      <div className="row g-0">
        <div className="col-md-4">
          <img
            style={{ height: "100%" }}
            src={avatar}
            className="img-fluid rounded-start"
            alt={`${firstName} ${lastName}'s avatar`}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <a href="#">
              <p className="card-text">
                <strong>{admin}</strong>
              </p>
              <p className="card-text">{`${firstName}  ${lastName}`}</p>
              <p className="card-text">
                <strong>{department}</strong>
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
