import avatar from "../../assets/avatar.svg";
import "./SideBar.css";

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__row">
        <img
          src={avatar}
          alt="Terrence Tegegne Avatar"
          className="sidebar__avatar"
        />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>
    </aside>
  );
}

export default SideBar;
