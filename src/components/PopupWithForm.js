import React from "react";

function PopupWithForm(props) {
  return (
    <>
      <div
        className={`popup ${props.name} ${
          props.isEditProfilePopupOpen ||
          props.isEditAvatarPopupOpen ||
          props.isAddPlacePopupOpen
            ? `${props.isOpen}`
            : ""
        }`}
      >
        <div className="popup__container">
          <h2 className="popup__text">{props.title}</h2>
          <form className="popup__form" name={props.name} noValidate>
            {props.children}
            <button
              type="submit"
              className="popup__submit-button popup__submit-button_hover"
            >
              {props.textButton}
            </button>
          </form>
          <button
            aria-label="Close"
            type="button"
            className="popup__button-close"
            onClick={props.onClose}
          />
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;
