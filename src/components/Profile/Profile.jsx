import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getToken } from "../../utils/token";

function Profile({
  handleAddClick,
  handleCardClick,
  clothingItems,
  handleLogout,
  openProfileEditModal,
}) {
  const { isLoggedIn } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const token = getToken();
    if (token) {
      return;
    } else {
      navigate("/");
    }
  }, [isLoggedIn]);

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
