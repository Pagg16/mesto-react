import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const dataUser = React.useContext(CurrentUserContext);

  const [inputValues, setInputValues] = React.useState({ name: "", about: "" });
  const [inputsValidity, setInputsValidity] = React.useState({
    name: true,
    about: true,
  });

  const [inputErrorMessages, setInputErrorMessages] = React.useState({
    name: "",
    about: "",
  });

  function handleInputChange(evt) {
    setInputValues({
      ...inputValues,
      [evt.target.name]: evt.target.value,
    });

    setInputsValidity({
      ...inputsValidity,
      [evt.target.name]: evt.target.validity.valid,
    });

    setInputErrorMessages({
      ...inputErrorMessages,
      [evt.target.name]: evt.target.validationMessage,
    });
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: inputValues.name,
      about: inputValues.about,
    });
  }

  React.useEffect(() => {
    if (props.isOpen) {
      setInputValues({ name: dataUser.name, about: dataUser.about });
    }
  }, [props.isOpen, dataUser]);

  function clickingCloseButton() {
    props.onClose();
    setInputsValidity({ name: true, about: true });
    setInputErrorMessages({ name: "", about: "" });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={clickingCloseButton}
      name={"popup-profile"}
      textButton={props.textButton}
      title={"Редактировать профиль"}
      activeValid={
        inputsValidity.name === true && inputsValidity.about === true
      }
    >
      <input
        value={inputValues.name}
        onChange={handleInputChange}
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
      <span
        className={`error user-name-error ${
          inputsValidity.name ? "" : "popup__error_visible"
        }`}
      >
        {inputErrorMessages.name}
      </span>
      <input
        value={inputValues.about}
        onChange={handleInputChange}
        type="text"
        id="user-job"
        name="about"
        placeholder="Работа"
        className="popup__filed"
        minLength={2}
        maxLength={200}
        autoComplete="off"
        required
      />
      <span
        className={`error user-job-error ${
          inputsValidity.about ? "" : "popup__error_visible"
        }`}
      >
        {inputErrorMessages.about}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
