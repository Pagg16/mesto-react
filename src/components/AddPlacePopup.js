import React from "react";
import PopupWithForm from "./PopupWithForm";
import { FormValidator } from "./FormValidator.js";
import { dataNamingConfiuration } from "../utils/constans";

function AddPlacePopup(props) {
  const [inputValues, setInputValues] = React.useState({ name: "", link: "" });

  const [ifClose, setIfClose] = React.useState(false);

  function handleInputChange(evt) {
    setInputValues({
      ...inputValues,
      [evt.target.name]: evt.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.handleSubmit({
      name: inputValues.name,
      link: inputValues.link,
    },cleaningFields);
  }

  //тест валидации при помощи классового компонента
  React.useEffect(() => {
    const formValidator = new FormValidator(
      dataNamingConfiuration,
      "popup-posts"
    );
    formValidator.enableValidation();
    if (ifClose) {
      formValidator.clearingErrorFields();
      setIfClose(false);
    }
  }, [props.isOpen, ifClose]);

  function clickingCloseButton() {
    props.onClose();
    cleaningFields();
  }

  function cleaningFields() {
    setInputValues({ name: "", link: "" });
    setIfClose(true);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={clickingCloseButton}
      name={"popup-posts"}
      textButton={props.textButton}
      title={"Новое место"}
      activeValid={true}
    >
      <input
        value={inputValues.name}
        onChange={handleInputChange}
        type="text"
        id="name-card"
        name="name"
        placeholder="Название"
        className="popup__filed"
        minLength={2}
        maxLength={30}
        autoComplete="off"
        required
      />
      <span className="error name-card-error" />
      <input
        value={inputValues.link}
        onChange={handleInputChange}
        type="url"
        id="link-card"
        name="link"
        placeholder="Ссылка на картинку"
        className="popup__filed"
        autoComplete="off"
        required
      />
      <span className="error link-card-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
