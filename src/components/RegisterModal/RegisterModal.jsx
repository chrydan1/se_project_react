import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, handleRegister, onOpenLogin }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const isFormValid =
    values.email && values.password && values.name && values.avatar;

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegister(values);
    setValues({ name: "", avatar: "", email: "", password: "" });
    onClose();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign Up"
      buttonText="Sign Up"
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid}
      alternateText="or "
      alternateLinkText="Log In"
      onAlternateClick={onOpenLogin}
      containerModifier="modal__container_type_signup"
    >
      <fieldset className="modal__fieldset">
        <label className="modal__label">
          Email
          <input
            type="email"
            name="email"
            className="modal__input"
            value={values.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className="modal__label">
          Password
          <input
            type="password"
            name="password"
            className="modal__input"
            value={values.password}
            onChange={handleChange}
            required
          />
        </label>

        <label className="modal__label">
          Name
          <input
            type="text"
            name="name"
            className="modal__input"
            value={values.name}
            onChange={handleChange}
            required
          />
        </label>

        <label className="modal__label">
          Avatar URL
          <input
            type="url"
            name="avatar"
            className="modal__input"
            value={values.avatar}
            onChange={handleChange}
            required
          />
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default RegisterModal;
