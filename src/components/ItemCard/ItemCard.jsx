import "./ItemCard.css";
import likeIcon from "../../assets/heart.svg";
import likedIcon from "../../assets/blackHeart.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ data, onCardClick, onCardLike }) {
  function handleOpenCard() {
    onCardClick(data);
  }

  const handleLikeClick = () => {
    onCardLike({
      id: data._id,
      isLiked,
    });
  };

  const currentUser = useContext(CurrentUserContext);
const isLiked = data.likes?.some((like) =>
  (like._id || like) === currentUser?._id
);


  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__title">{data.name}</h2>

        <button
          type="button"
          className="card__like-button"
          onClick={handleLikeClick}
        >
          <img src={isLiked ? likedIcon : likeIcon} alt="like button" />
        </button>
      </div>

      <img
        src={data.imageUrl}
        alt={data.name}
        className="card__image"
        onClick={handleOpenCard}
      />
    </li>
  );
}

export default ItemCard;
