import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const userAvatar = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: userAvatar.current.value,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={"avatar-edit"}
      textButton={"Сохранить"}
      title={"Обновить аватар"}
      children={
        <>
          <input
            ref={userAvatar}
            type="url"
            id="avatar-edit"
            name="edit"
            placeholder="Ссылка на картинку"
            className="popup__filed"
            autoComplete="off"
            required
          />
          <span className="error avatar-edit-error" />
        </>
      }
    />
  );
}

export default EditAvatarPopup;
