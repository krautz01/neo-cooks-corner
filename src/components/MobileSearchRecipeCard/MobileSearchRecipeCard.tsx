import { Link } from "react-router-dom";
import link_arrow_icon from "@assets/icons/link_arrow_icon.svg";
import mobile from "@assets/images/mobile.png";

interface IProps {
  id: number;
  title: string;
  photo: string;
}

const MobileSearchRecipeCard: React.FC<IProps> = ({ id, title, photo }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "#343434",
            gap: "9px",
          }}
        >
          <img
            src={photo || mobile}
            alt="photo"
            style={{ width: "40px", height: "40px", borderRadius: "8px" }}
          />
          <div
            style={{
              color: "#343434",
              fontSize: "14px",
              fontWeight: "400",
              textAlign: "left",
            }}
          >
            {title}
          </div>
        </div>
        <Link to={`/recipe/${id}`}>
          View <img src={link_arrow_icon} alt="arrow" />
        </Link>
      </div>
    </div>
  );
};

export default MobileSearchRecipeCard;