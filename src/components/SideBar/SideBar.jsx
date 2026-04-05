import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ handleSignOut, handleOpenEditProfileModal }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <aside className="sidebar">
      <div className="sidebar__row">
        {currentUser.avatar && (
          <img
            src={currentUser.avatar}
            alt={currentUser.name || "User"}
            className="sidebar__avatar"
          />
        )}

        <p className="sidebar__username">{currentUser.name || "User"}</p>
      </div>

      <button
        type="button"
        className="sidebar__profile-btn"
        onClick={handleOpenEditProfileModal}
      >
        Change profile data
      </button>

      <button
        type="button"
        className="sidebar__signout-btn"
        onClick={handleSignOut}
      >
        Log out
      </button>
    </aside>
  );
}

export default SideBar;
