import { useState } from "react";
import "./App.css";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Header from "../Header/Header";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { defaultClothingItems } from "../../utils/defaultClothingItems";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

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

  return (
    <div className="app">
      <Header handleOpenAddGarmentModal={handleOpenAddGarmentModal} />
      <Main
        clothingItems={clothingItems}
        handleOpenItemModal={handleOpenItemModal}
      />
      <ItemModal
        card={selectedCard}
        isOpen={activeModal === "item-modal"}
        onClose={handleCloseModal}
      />

      <ModalWithForm
        isOpen={activeModal === "add-garment-modal"}
        title={"New Garment"}
        buttonText={"Add garment"}
        name="add-garment-form"
        onClose={handleCloseModal}
      >
        <fieldset className="modal__fieldset">
          <label htmlFor="add-garment-name-input" className="modal__label">
            Name{" "}
            <input
              placeholder="Name"
              id="add-garment-name-input"
              type="text"
              className="modal__input"
            />
          </label>

          <label htmlFor="add-garment-image-input" className="modal__label">
            Image
            <input
              id="add-garment-image-input"
              type="url"
              placeholder="Image URL"
              className="modal__input"
            />
          </label>
        </fieldset>

        {/* RADIO BUTTONS */}

        <fieldset className="modal__fieldset">
          <legend>Select the weather type:</legend>

          <div>
            <label
              className="modal__label-radio modal__label-radio--primary"
              htmlFor="hot"
            >
              <input
                className="modal__radio-btn"
                type="radio"
                id="hot"
                name="weather"
                value="hot"
              />
              Hot
            </label>
          </div>

          <div>
            <label className="modal__label-radio" htmlFor="warm">
              <input
                className="modal__radio-btn"
                type="radio"
                name="weather"
                id="warm"
                value="warm"
              />
              Warm
            </label>
          </div>

          <div>
            <label className="modal__label-radio" htmlFor="cold">
              <input
                className="modal__radio-btn"
                id="cold"
                type="radio"
                name="weather"
                value="cold"
              />
              Cold
            </label>
          </div>
        </fieldset>
      </ModalWithForm>

      <Footer />
    </div>
  );
}

export default App;
