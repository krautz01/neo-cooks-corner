import React from "react";

interface IProps {
  chefPhoto: string;
  name: string;
}

const ChefCard: React.FC<IProps> = ({ chefPhoto, name }) => {
  return (
    <div>
      <img
        src={chefPhoto}
        alt="chefPhoto"
        style={{ width: "120px", height: "120px" }}
      />
      <p>{name}</p>
    </div>
  );
};

export default ChefCard;
