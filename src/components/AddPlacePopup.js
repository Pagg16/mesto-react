import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const cardName = React.useRef();

  const cardLink = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.handleSubmit({
      name: cardName.current.value,
      link: cardLink.current.value,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={"popup-posts"}
      textButton={"Создать"}
      title={"Новое место"}
      children={
        <>
          <input
            ref={cardName}
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
            ref={cardLink}
            type="url"
            id="link-card"
            name="link"
            placeholder="Ссылка на картинку"
            className="popup__filed"
            autoComplete="off"
            required
          />
          <span className="error link-card-error" />
        </>
      }
    />
  );
}

export default AddPlacePopup;
