import s from "./RecipeCard.module.scss";
import zozo from "../../assets/images/zozo.png";
import like_icon from "../../assets/icons/like_icon.svg";
import saved_icon from "../../assets/icons/saved_icon.svg";

export default function RecipeCard() {
  console.log(zozo);
  return (
    <div className={s.recipe_card} style={{ backgroundImage: `url(${zozo})` }}>
      <div className={s.recipe_card_info}>
        <p className={s.recipe_name}>RecipeCard</p>
        <p className={s.recipe_author}>by Ainsley Harriott</p>
        <div className={s.recipe_card_raitings}>
          <p>
            <img src={like_icon} alt="" />
            118
          </p>
          <p>
            <img src={saved_icon} alt="" />
            118
          </p>
        </div>
      </div>
    </div>
  );
}
