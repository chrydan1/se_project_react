import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, currentUser, onUpdateUser }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setName(currentUser.name || "");
    setAvatar(currentUser.avatar || "");
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      avatar,
    });
  }

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      className="edit-profile-modal"
    >
      <label className="modal__label">
        Name *
        <input
          type="text"
          className="modal__input"
          placeholder="Name"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label className="modal__label">
        Avatar *
        <input
          type="url"
          className="modal__input"
          placeholder="Avatar URL"
          required
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;