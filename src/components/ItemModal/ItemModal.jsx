import "./ItemModal.css";
import btnXWhite from "../../assets/delete_white_x.svg";

function ItemModal({ card, isOpen, onClose }) {
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
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__text-garment"> {card.name} </h2>
          <h2 className="modal__text-weather"> {card.weather} </h2>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
