import React from "react";

function PopupWithForm(props) {
  return (
    <>
      <div
        className={`popup ${props.name} ${props.isOpen ? "popup_opened" : ""}`}
      >
        <div className="popup__container">
          <h2 className="popup__text">{props.title}</h2>
          <form
            onSubmit={props.onSubmit}
            className="popup__form"
            name={props.name}
          >
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
