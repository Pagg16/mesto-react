import React from "react";
import api from "../utils/Api";
import Card from "./card";

function Main({
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  onCardClick,
}) {
  const [userName, changeUserName] = React.useState();

  const [userDescription, changeUserDescription] = React.useState();

  const [userAvatar, changeUserAvatar] = React.useState();

  const [cards, changeCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getinfouser()
      .then((res) => {
        changeUserAvatar(res.avatar);
        changeUserName(res.name);
        changeUserDescription(res.about);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        changeCards(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__blackout">
          <img alt="аватарка" className="profile__avatar" src={userAvatar} />
          <div
            className="profile__avatar-edit"
            onClick={handleEditAvatarClick}
          />
        </div>
        <div className="profile-info">
          <div className="profile-info__title-button">
            <h1 className="profile-info__title">{userName}</h1>
            <button
              aria-label="edit"
              type="button"
              className="button button_type_edit"
              onClick={handleEditProfileClick}
            />
          </div>
          <p className="profile-info__subtitle">{userDescription}</p>
        </div>
        <button
          aria-label="add"
          type="button"
          className="button button_type_add"
          onClick={handleAddPlaceClick}
        />
      </section>
      <section className="elements">
        {cards.map((card, id) => (
          <Card key={id} card={card} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
