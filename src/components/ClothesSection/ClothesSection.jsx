import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  clothingItems,
  handleOpenItemModal,
  handleOpenAddGarmentModal,
  onCardLike,
}) {

  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
  (item) => item.owner?._id === currentUser._id || item.owner === currentUser._id,
);

  return (
    <section className="clothes-section">
      <div className="clothes-section__row">
        Your items
        <button
          type="button"
          onClick={handleOpenAddGarmentModal}
          className="clothes-section__btn"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__card-list">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              data={item}
              onCardClick={handleOpenItemModal}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default ClothesSection;
