import React from "react";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="element">
      <button
        aria-label="open"
        type="button"
        className="element__button-image-open"
        onClick={handleClick}
      >
        <img
          alt={props.card.name}
          className="element__image"
          src={props.card.link}
        />
      </button>
      <button
        type="button"
        className="element__button-delete-post element__button-delete-post_active"
      />
      <div className="rectangle">
        <h2 className="rectangle__text">{props.card.name}</h2>
        <div className="rectangle__like-box">
          <button type="button" className="rectangle__button-like" />
          <p className="rectangle__like-number">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
