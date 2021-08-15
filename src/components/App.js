import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';


function App() {
  const [avatarPopupOpen, setAvatarPopupOpen] = React.useState(false); //Открытие попапа аватара
  const [profilePopupOpen, setProfilePopupOpen] = React.useState(false); // Открытие попапа редактирования профиля
  const [newCardPopupOpen, setNewCardPopupOpen] = React.useState(false); //Открытие попапа добавления новой карточки
  const [confirmPopupOpen, setConfirmPopupOpen] = React.useState(false); //Подтвержение удаления карточки
  const [imagePopupOpen, setImagePopupOpen] = React.useState(false); //Открытие картинки в большом размере
  const [cardData, setCardData] = React.useState({});
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cardsInfo, setCardsInfo] = React.useState([]);

  React.useEffect(() => {
    // let myId = null;
    Promise.all([api.getUserInfo(),
    api.getInitialCards()])
      .then(([userInfoClass, cardInfo]) => {
        //   myId = userInfoClass._id;
        setUserName(userInfoClass.name);
        setUserDescription(userInfoClass.about);
        setUserAvatar(userInfoClass.avatar);

        setCardsInfo(cardInfo)
      })
      .catch(() => {
        console.error('Что-то сломалось!')
      })
  }, [])


  const onCardClick = (link, name) => {
    setImagePopupOpen(true);
    setCardData({ link, name })
  }

  return (
    <div className="App">
      <div className="page">
        <Header />
        <Main setAvatarPopupOpen={setAvatarPopupOpen} 
        setProfilePopupOpen={setProfilePopupOpen} 
        setNewCardPopupOpen={setNewCardPopupOpen} 
        setConfirmPopupOpen={setConfirmPopupOpen} 
        onCardClick={onCardClick} 
        userAvatar={userAvatar}
        userName={userName}
        userDescription={userDescription}
        cardsInfo={cardsInfo} />
        <Footer />
        <PopupWithForm isOpen={avatarPopupOpen} onClose={() => setAvatarPopupOpen(false)} name='avatar' title='Обновить аватар' button='Сохранить'>
          <input type="url" id="avatar" className="form__input form__input_type_avatar" name="avatar"
            placeholder="ссылка на аватар" required />
          <span id="avatar-error" className="form__input-error"></span>
        </PopupWithForm>
        <PopupWithForm isOpen={profilePopupOpen} onClose={() => setProfilePopupOpen(false)} name='profile' title='Редактировать профиль' button='Сохранить'>
          <input type="text" id="name" className="form__input form__input_type_name" name="name"
            placeholder="Имя" minLength="2" maxLength="30" required />
          <span id="name-error" className="form__input-error"></span>
          <input type="text" id="role" className="form__input form__input_type_role" name="about"
            placeholder="Профессия" minLength="2" maxLength="30" required />
          <span id="role-error" className="form__input-error"></span>
        </PopupWithForm>
        <PopupWithForm isOpen={newCardPopupOpen} onClose={() => setNewCardPopupOpen(false)} name='images' title='Новое место' button='Сохранить'>
          <input type="text" id="name-card" className="form__input form__input_type_title" placeholder="Название"
            name="title" minLength="2" maxLength="30" required />
          <span id="name-card-error" className="form__input-error"></span>
          <input type="url" id="link" className="form__input form__input_type_link" placeholder="ссылка на картинку"
            name="link" required />
          <span id="link-error" className="form__input-error"></span>
        </PopupWithForm>
        <PopupWithForm isOpen={confirmPopupOpen} onClose={() => setConfirmPopupOpen(false)} name='delete' title='Вы уверены?' button='Да' />
        {imagePopupOpen && <ImagePopup {...cardData} setImagePopupOpen={setImagePopupOpen} />}

      </div>
    </div>
  );
}

export default App;