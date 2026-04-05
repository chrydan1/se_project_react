import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, onClose, handleAddItemSubmit }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    weather: "",
    imageUrl: "",
  });

  const isFormValid = values.name && values.imageUrl && values.weather;

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddItemSubmit(values);
    setValues({ name: "", weather: "", imageUrl: "" });
    onClose();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title={"New Garment"}
      buttonText={"Add garment"}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid}
      containerModifier="modal__container_type_add-garment"
    >
      <fieldset className="modal__fieldset">
        <label htmlFor="add-garment-name-input" className="modal__label">
          Name
          <input
            placeholder="Name"
            id="add-garment-name-input"
            type="text"
            className="modal__input"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="add-garment-link-input" className="modal__label">
          Image
          <input
            id="add-garment-link-input"
            type="url"
            placeholder="Image URL"
            className="modal__input"
            name="imageUrl"
            value={values.imageUrl}
            onChange={handleChange}
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
              checked={values.weather === "hot"}
              onChange={handleChange}
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
              checked={values.weather === "warm"}
              onChange={handleChange}
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
              checked={values.weather === "cold"}
              onChange={handleChange}
            />
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
