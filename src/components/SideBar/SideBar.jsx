import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ handleLogout, openProfileEditModal }) {
  const { currentUser } = useContext(CurrentUserContext);
  const noAvatar = Array.from(currentUser.name)[0];
  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        {currentUser.avatar ? (
          <img
            src={currentUser?.avatar}
            alt="User Avatar"
            className="sidebar__avatar"
          />
        ) : (
          <p className="sidebar__avatar sidebar__no-avatar">{noAvatar}</p>
        )}
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <button
        type="button"
        className="sidebar__text-btn"
        onClick={openProfileEditModal}
      >
        Change profile data
      </button>
      <button
        type="button"
        className="sidebar__text-btn"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
}

export default SideBar;
