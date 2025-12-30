import btnX from "../../assets/close_x.svg";

function ModalWithForm({
  isOpen,
  children,
  handleSubmit,
  title,
  buttonText,
  name,
  onClose,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="modal__container modal__container_type_form">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close-btn modal__close-btn_type_form"
          onClick={onClose}
        >
          <img src={btnX} alt="Logo X" className="modal__close-btn_logo_form" />
        </button>

        <form onSubmit={handleSubmit} name={name} className="modal__form">
          {children}
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
