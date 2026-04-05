import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, handleLogin, onOpenRegister }) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const isFormValid = values.email && values.password;
  const [loginError, setLoginError] = useState("");
  const hasError = !!loginError;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError("");

    try {
      await handleLogin(values);
      setValues({ email: "", password: "" });
    } catch (err) {
      setLoginError("Email or password incorrect");
    }
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Log In"
      buttonText="Log In"
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid}
      alternateText="or "
      alternateLinkText="Sign Up"
      onAlternateClick={onOpenRegister}
      containerModifier={`modal__container_type_login ${
        hasError ? "modal__container_type_login-error" : ""
      }`}
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
            className="modal__input modal__input_type_password"
            value={values.password}
            onChange={handleChange}
            required
          />
        </label>

        {loginError && <p className="modal__error-message">{loginError}</p>}
      </fieldset>
    </ModalWithForm>
  );
}

export default LoginModal;
