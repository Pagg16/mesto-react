import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  //переменные состояния открытия попапов
  const [isEditAvatarPopupOpen, setEditAvatarClick] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = React.useState(false);

  //перемнная массива карточек
  const [cards, changeCards] = React.useState([]);

  //переменная с данными пользователя
  const [currentUser, currentUserSet] = React.useState([]);

  //переменная открытия картинки с данными картинки
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });

  //загрузка данных с сервера
  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getinfouser()])
      .then(([cardList, userInfo]) => {
        currentUserSet(userInfo);
        changeCards(cardList);
      })
      .catch((err) => console.log(err));
  }, []);

  //установка лайка
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.cardLikeLink(card._id, !isLiked).then((cardLike) => {
      const newCardsLike = cards.map((c) => {
        return c._id === cardLike._id ? cardLike : c;
      });
      changeCards(newCardsLike);
    });
  }

  //добавление карточки
  function handleAddPlaceSubmit(card) {
    api.sendingCardServer(card).then((addCard) => {
      changeCards([addCard, ...cards]);
    });
  }

  //удаление карточки
  function handleCardDelete(card) {
    api.cardDelLink(card._id).then((delCard) => {
      const newCards = cards.filter((c) => {
        return c._id === card._id ? "" : c;
      });
      changeCards(newCards);
    });
  }

  //открытие поста
  function handleCardClick(data) {
    setSelectedCard({ name: data.name, link: data.link });
  }

  //закрытие всех попапов
  function closeAllPopups() {
    setEditAvatarClick(false);
    setEditProfileClick(false);
    setAddPlaceClick(false);
    setSelectedCard({ name: "", link: "" });
  }

  //открытие попапа с изменением аватара
  function handleEditAvatarClick() {
    setEditAvatarClick(true);
  }

  //открытие попапа с изменением профиля
  function handleEditProfileClick() {
    setEditProfileClick(true);
  }

  //открытие попапа с добавлением карточки
  function handleAddPlaceClick() {
    setAddPlaceClick(true);
  }

  //обработчик изменения данных пользователя
  function handleUpdateUser(data) {
    api.getinfouserDispatch(data).then((dataUser) => {
      currentUserSet(dataUser);
      closeAllPopups();
    });
  }

  //обработка изменения аватара пользователя
  function handleUpdateUserAvatar(avatar) {
    api.dispatchAvatarUser(avatar).then((dataUser) => {
      currentUserSet(dataUser);
      closeAllPopups();
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          handleEditAvatarClick={handleEditAvatarClick}
          handleEditProfileClick={handleEditProfileClick}
          handleAddPlaceClick={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          handleCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateUserAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          handleSubmit={handleAddPlaceSubmit}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Footer />
        <template id="post-element" />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
