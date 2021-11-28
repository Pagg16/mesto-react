import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const dataUser = React.useContext(CurrentUserContext);
  const [name, nameSet] = React.useState("");
  const [description, descriptionSet] = React.useState("");

  function handleChangeName(e) {
    nameSet(e.target.value);
  }

  function handleChangeDescription(e) {
    descriptionSet(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  React.useEffect(() => {
    if (props.isOpen) {
      nameSet(dataUser.name);
      descriptionSet(dataUser.about);
    }
  }, [props.isOpen, dataUser]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={"popup-profile"}
      textButton={"Сохранить"}
      title={"Редактировать профиль"}
      children={
        <>
          <input
            value={name}
            onChange={handleChangeName}
            type="text"
            id="user-name"
            name="name"
            placeholder="Имя"
            className="popup__filed"
            minLength={2}
            maxLength={40}
            autoComplete="off"
            required
          />
          <span className="error user-name-error" />
          <input
            value={description}
            onChange={handleChangeDescription}
            type="text"
            id="user-job"
            name="job"
            placeholder="Работа"
            className="popup__filed"
            minLength={2}
            maxLength={200}
            autoComplete="off"
            required
          />
          <span className="error user-job-error" />
        </>
      }
    />
  );
}

export default EditProfilePopup;
