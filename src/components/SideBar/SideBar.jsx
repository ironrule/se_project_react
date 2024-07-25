import "./SideBar.css";
import avatar from "../../images/avatar.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Terrence Tegegne" className="sidebar__avatar" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
