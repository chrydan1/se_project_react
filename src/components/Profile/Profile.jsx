import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  clothingItems,
  handleOpenAddGarmentModal,
  handleOpenItemModal,
  onCardLike,
  handleSignOut,
  handleOpenEditProfileModal,
}) {
  return (
    <main className="profile">
      <SideBar
        handleSignOut={handleSignOut}
        handleOpenEditProfileModal={handleOpenEditProfileModal}
      />

      <ClothesSection
        clothingItems={clothingItems}
        handleOpenAddGarmentModal={handleOpenAddGarmentModal}
        handleOpenItemModal={handleOpenItemModal}
        onCardLike={onCardLike}
      />
    </main>
  );
}

export default Profile;
