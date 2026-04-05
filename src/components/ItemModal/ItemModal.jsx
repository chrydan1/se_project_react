import "./ItemModal.css";
import btnXWhite from "../../assets/delete_white_x.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ card, isOpen, onClose, handleDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn =
    card.owner?._id === currentUser._id || card.owner === currentUser._id;

  function handleDelete() {
    handleDeleteItem(card);
  }

  return (
    <div className={`modal ${isOpen ? " modal_is-opened " : ""}`}>
      <div className="modal__container">
        <button type="button" className="modal__close-btn" onClick={onClose}>
          <img
            src={btnXWhite}
            alt="Logo X"
            className="modal__close-btn_logo_modal"
          />
        </button>

        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <div className="modal__info">
            <h2 className="modal__text-garment">{card.name}</h2>
            <h2 className="modal__text-weather">Weather: {card.weather}</h2>
          </div>

          {isOwn && (
            <button onClick={handleDelete} className="modal__delete-btn">
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;