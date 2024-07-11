import "./Header.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";

function Header({ handleAddClick }) {
  return (
    <header className="header">
      <img src={logo} alt="WTWR Logo Image" className="header__logo" />
      <p className="header__date-and-location">DATE, LOCATION</p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
