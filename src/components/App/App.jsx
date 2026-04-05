import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import ItemModal from "../ItemModal/ItemModal";
import { getWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  updateUser,
} from "../../utils/api";

import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { signup, signin, checkToken } from "../../utils/auth";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({ name: "", temp: "0" });
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  function handleOpenItemModal(card) {
    setSelectedCard(card);
    setActiveModal("item-modal");
  }

  function handleCloseModal() {
    setSelectedCard({});
    setActiveModal("");
  }

  function handleOpenAddGarmentModal() {
    setActiveModal("add-garment-modal");
  }

  function handleTempUnitChange() {
    if (currentTempUnit == "F") {
      setCurrentTempUnit("C");
    } else {
      setCurrentTempUnit("F");
    }
  }

  function handleAddItemSubmit(inputValues) {
    const token = localStorage.getItem("jwt");

    addItem(inputValues, token)
      .then((data) => {
        console.log("new item:", data);
        setClothingItems((prevItems) => [data.data, ...prevItems]);
        handleCloseModal();
      })
      .catch(console.error);
  }

  function handleDeleteItem(card) {
    const id = card._id ?? card.id;
    const token = localStorage.getItem("jwt");

    deleteItem(id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => (item._id ?? item.id) !== id),
        );
        handleCloseModal();
      })
      .catch(console.error);
  }

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems([...items].reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    checkToken(token)
      .then((userData) => {
        console.log("current user:", userData);
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
      });
  }, []);

  function handleCardLike({ id, isLiked }) {
    const token = localStorage.getItem("jwt");

    const apiCall = isLiked
      ? removeCardLike(id, token)
      : addCardLike(id, token);

    apiCall
      .then((updatedItem) => {
        const newCard = updatedItem.data || updatedItem;

        setClothingItems((items) =>
          items.map((item) => (item._id === newCard._id ? newCard : item)),
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleOpenRegisterModal() {
    setActiveModal("register-modal");
  }

  function handleOpenLoginModal() {
    setActiveModal("login-modal");
  }

  function handleOpenEditProfileModal() {
    setActiveModal("edit-profile-modal");
  }

  function handleRegister(values) {
    signup(values)
      .then(() => {
        return signin({
          email: values.email,
          password: values.password,
        });
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        return checkToken(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        handleCloseModal();
      })
      .catch(console.error);
  }

  function handleLogin(values) {
  return signin(values)
    .then((data) => {
      localStorage.setItem("jwt", data.token);
      setIsLoggedIn(true);
      return checkToken(data.token);
    })
    .then((userData) => {
      setCurrentUser(userData);
      handleCloseModal();
    });
}

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/");
  }

  function handleUpdateUser({ name, avatar }) {
    const token = localStorage.getItem("jwt");

    updateUser({ name, avatar }, token)
      .then((updatedUser) => {
        console.log("updatedUser:", updatedUser);
        setCurrentUser(updatedUser.data || updatedUser);
        handleCloseModal();
      })
      .catch(console.error);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTempUnit, handleTempUnitChange }}
      >
        <div className="app">
          <Header
            handleOpenAddGarmentModal={handleOpenAddGarmentModal}
            handleOpenRegisterModal={handleOpenRegisterModal}
            handleOpenLoginModal={handleOpenLoginModal}
            weatherData={weatherData}
            isLoggedIn={isLoggedIn}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleOpenItemModal={handleOpenItemModal}
                  onCardLike={handleCardLike}
                />
              }
            ></Route>

            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleOpenAddGarmentModal={handleOpenAddGarmentModal}
                  handleOpenItemModal={handleOpenItemModal}
                  onCardLike={handleCardLike}
                  handleSignOut={handleSignOut}
                  handleOpenEditProfileModal={handleOpenEditProfileModal}
                />
              }
            ></Route>
          </Routes>

          <ItemModal
            card={selectedCard}
            isOpen={activeModal === "item-modal"}
            onClose={handleCloseModal}
            handleDeleteItem={handleDeleteItem}
          />

          <AddItemModal
            isOpen={activeModal === "add-garment-modal"}
            onClose={handleCloseModal}
            handleAddItemSubmit={handleAddItemSubmit}
          />

          <RegisterModal
            isOpen={activeModal === "register-modal"}
            onClose={handleCloseModal}
            handleRegister={handleRegister}
            onOpenLogin={handleOpenLoginModal}
          />

          <LoginModal
            isOpen={activeModal === "login-modal"}
            onClose={handleCloseModal}
            handleLogin={handleLogin}
            onOpenRegister={handleOpenRegisterModal}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile-modal"}
            onClose={handleCloseModal}
            currentUser={currentUser}
            onUpdateUser={handleUpdateUser}
          />

          <Footer />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
