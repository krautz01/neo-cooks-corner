import React from "react";
import styles from "./ChefCard.module.scss";
import link_arrow_icon from "@assets/icons/link_arrow_icon.svg";
import { Link } from "react-router-dom";

interface IProps {
  chefPhoto: string;
  name: string;
  chefId: number;
}

const ChefCard: React.FC<IProps> = ({ chefPhoto, name, chefId }) => {
  const isSmallScreen = window.innerWidth < 426;
  return (
    <>
      {isSmallScreen ? (
        <div className={styles.card_mobile}>
          <img src={chefPhoto} alt="chefPhoto" className={styles.image} />
          <p>{name}</p>
          <Link to={`/author/${chefId}`} className={styles.link}>
            View <img src={link_arrow_icon} alt="arrow" />
          </Link>
        </div>
      ) : (
        <div className={styles.card}>
          <Link to={`/author/${chefId}`}>
            <img src={chefPhoto} alt="chefPhoto" className={styles.image} />
          </Link>
          <p>{name}</p>
        </div>
      )}
    </>
  );
};

export default ChefCard;
