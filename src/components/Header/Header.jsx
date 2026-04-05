import logo from "../../assets/logo.svg";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleOpenAddGarmentModal,
  handleOpenRegisterModal,
  handleOpenLoginModal,
  weatherData,
  isLoggedIn,
}) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__side">
        <Link to="/">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </Link>
        <p className="header__place">
          <time className="header__datetime" dateTime={now}>
            {dateStr}
          </time>
          , {weatherData.city}
        </p>
      </div>

      <div className="header__side">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              onClick={handleOpenAddGarmentModal}
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>

            <Link className="header__link" to="/profile">
              <p className="header__username">{currentUser.name}</p>

              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser.name?.[0]?.toUpperCase()}
                </div>
              )}
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              className="header__signup-btn"
              onClick={handleOpenRegisterModal}
            >
              Sign Up
            </button>

            <button
              type="button"
              className="header__signin-btn"
              onClick={handleOpenLoginModal}
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
