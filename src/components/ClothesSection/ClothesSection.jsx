import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

// TODO - make the item modal open on the profile route
function ClothesSection({
  clothingItems,
  handleOpenItemModal,
  handleOpenAddGarmentModal,
}) {
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
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              data={item}
              onCardClick={handleOpenItemModal}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default ClothesSection;
