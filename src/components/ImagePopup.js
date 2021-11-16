function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup-images ${card ? `${isOpen}` : ""}`}>
      <div className="popup__image-container">
        <img alt={card.name} className="popup__image-open" src={card.link} />
        <h2 className="popup__image-text">{card.name}</h2>
        <button
          aria-label="Close"
          type="button"
          className="popup__button-close popup__button-close_image"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default ImagePopup;
