import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({
  handleAddClick,
  handleCardClick,
  handleLogout,
  openProfileEditModal,
}) {
  return (
    <div className="profile">
      <SideBar
        handleLogout={handleLogout}
        openProfileEditModal={openProfileEditModal}
      />
      <ClothesSection
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
      />
    </div>
  );
}

export default Profile;
