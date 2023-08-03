import React from "react";

const Feature = ({ title, desc, colClass, flexClass, icon }) => {
  return (
    <>
      <div className={colClass}>
        <div className={flexClass}>
          <div className="list-icon">
            {icon}
          </div>
          <div className="content">
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feature;
