import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  //переменные состояния
  const [isEditAvatarPopupOpen, setEditAvatarClick] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = React.useState(false);

  //переменная открытия картинки с данными картинки
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });

  function handleCardClick(data) {
    setSelectedCard({ name: data.name, link: data.link });
  }

  function closeAllPopups() {
    setEditAvatarClick(false);
    setEditProfileClick(false);
    setAddPlaceClick(false);
    setSelectedCard({ name: "", link: "" });
  }

  function handleEditAvatarClick() {
    setEditAvatarClick(true);
  }

  function handleEditProfileClick() {
    setEditProfileClick(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceClick(true);
  }

  return (
    <div className="page">
      <Header />
      <Main
        handleEditAvatarClick={handleEditAvatarClick}
        handleEditProfileClick={handleEditProfileClick}
        handleAddPlaceClick={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        name={"popup-profile"}
        textButton={"Сохранить"}
        title={"Редактировать профиль"}
        children={
          <>
            <input
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
      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        name={"avatar-edit"}
        textButton={"Сохранить"}
        title={"Обновить аватар"}
        children={
          <>
            <input
              type="url"
              id="avatar-edit"
              name="edit"
              placeholder="Ссылка на картинку"
              className="popup__filed"
              autoComplete="off"
              required
            />
            <span className="error avatar-edit-error" />
          </>
        }
      />
      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        name={"popup-posts"}
        textButton={"Создать"}
        title={"Новое место"}
        children={
          <>
            <input
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
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <Footer />
      <template id="post-element" />
    </div>
  );
}

export default App;
