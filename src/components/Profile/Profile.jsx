import { useNavigate } from "react-router-dom";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({
  handleAddClick,
  handleCardClick,
  clothingItems,
  handleLogout,
  openProfileEditModal,
}) {
  const navigate = useNavigate();

  return (
    <div className="profile">
      <SideBar
        handleLogout={handleLogout}
        openProfileEditModal={openProfileEditModal}
      />
      <ClothesSection
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
        clothingItems={clothingItems}
      />
    </div>
  );
}

export default Profile;
