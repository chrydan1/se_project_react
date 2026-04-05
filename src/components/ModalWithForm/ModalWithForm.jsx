import btnX from "../../assets/close_x.svg";
import "./ModalWithForm.css";
import { useEffect } from "react";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  alternateText,
  alternateLinkText,
  onAlternateClick,
  isSubmitDisabled,
  containerModifier = "",
}) 
{

useEffect(() => {
  const handleEscClose = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  if (isOpen) {
    document.addEventListener("keydown", handleEscClose);
  }

  return () => {
    document.removeEventListener("keydown", handleEscClose);
  };
}, [isOpen, onClose]);

  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className={`modal__container modal__container_type_form ${containerModifier}`}>
        <h2 className="modal__title">{title}</h2>

        <button
          type="button"
          className="modal__close-btn modal__close-btn_type_form"
          onClick={onClose}
        >
          <img
            src={btnX}
            alt="Close button"
            className="modal__close-btn_logo_form"
          />
        </button>

        <form onSubmit={onSubmit} className="modal__form">
          {children}

          <button
            type="submit"
            className="modal__submit-btn"
            disabled={isSubmitDisabled}
          >
            {buttonText}
          </button>

          {alternateLinkText && (
            <p className="modal__alternate">
              <span className="modal__alternate-text">{alternateText}</span>
              <button 
                type="button"
                className="modal__alternate-button"
                onClick={onAlternateClick}
              >
                {alternateLinkText}
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
