import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup-images ${
        props.card.link !== "" ? "popup_opened" : ""
      }`}
    >
      <div className="popup__image-container">
        <img alt={props.name} className="popup__image-open" src={props.link} />
        <h2 className="popup__image-text">{props.name}</h2>
        <button
          aria-label="Close"
          type="button"
          className="popup__button-close popup__button-close_image"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default ;
