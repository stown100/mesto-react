import React from 'react';
import profileRedactImg from '../images/image.png';
import profileEdit from '../images/EditButton.svg';
import profileVector from '../images/Vector.svg';
import deleteImg from '../images/delete.svg';
import likeImg from '../images/Group.svg';
import cardImg from '../images/kirill-pershin-1088404-unsplash.png';
import closePopupImg from '../images/CloseIcon.svg';
import '../index.css';
import PopupWithForm from './PopupWithForm';
import api from '../utils/Api';
import {Card} from './Card';
import ImagePopup from './ImagePopup';
import Spinner from './Spinner';
import {handleClick} from './Card'

function Main() {
    //попапы
    const [avatarPopupOpen, setAvatarPopupOpen] = React.useState(false); //Открытие попапа аватара
    const [profilePopupOpen, setProfilePopupOpen] = React.useState(false); // Открытие попапа редактирования профиля
    const [newCardPopupOpen, setNewCardPopupOpen] = React.useState(false); //Открытие попапа добавления новой карточки
    const [imagePopupOpen, setImagePopupOpen] = React.useState(false); //Открытие картинки в большом размере
    const [userName, setUserName] = React.useState('')
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('')
    const [cardsInfo, setCardsInfo] = React.useState();

    //Рендер данных пользоватеря и карточек
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
    })}, [])


    return (
        <main className="main">
        <section className="profile">
            <div className="profile__block">
                <li className="profile__redact-image" onClick={() => setAvatarPopupOpen(true)}><img src={userAvatar} className="profile__jack"
                        alt="Аватар" /><span className="profile__redact-img"></span></li>
                <div className="profile__info">
                    <div className="profile__title-button">
                        <h1 className="profile__title">{userName}</h1>
                        <button type="button" className="profile__edit-button" onClick={() => setProfilePopupOpen(true)}>
                            <img className="profile__edit" src={profileEdit}
                                alt="Редактировать" />
                        </button>
                    </div>
                    <p className="profile__subtitle">{userDescription}</p>
                </div>
            </div>
            <button type="button" className="profile__vector-button" onClick={() => setNewCardPopupOpen(true)}>
                <img src={profileVector} className="profile__vector" alt="Плюс" />
            </button>
        </section>
        <section className="elements">
           {cardsInfo ? cardsInfo.map(({link, name, likes, _id}) => <Card link={link} name={name} likes={likes} key={_id}/>) : <h3><Spinner /></h3>}
        </section>

        {/* <div className="popup popup_img">
        <div className="popup__container popup__container_img">
            <button type="button" className="popup__close popup__close_img">
                <img src={closePopupImg} alt="Крестик" />
            </button>
            <img src={cardImg} className="popup__img" alt="фото" />
            <h2 className="popup__title"></h2>
        </div>
    </div> */}


    <div className="popup popup_delete">
        <div className="popup__container popup__container_delete">
            <button type="button" className="popup__close popup__close_delete">
                <img src={closePopupImg} alt="Крестик" />
            </button>
            <form className="form" action="#" name="formDeleteCard" noValidate>
                <h3 className="form__title form__title-delete">Вы уверены?</h3>
                <button type="submit" className="form__button form__button-delete">Да</button>
            </form>
        </div>
    </div>
    <PopupWithForm isOpen={avatarPopupOpen} onClose={() => setAvatarPopupOpen(false)} name='avatar' title='Обновить аватар'>
        <input type="url" id="avatar" className="form__input form__input_type_avatar" name="avatar"
                    placeholder="ссылка на аватар" required />
            <span id="avatar-error" className="form__input-error"></span>
    </PopupWithForm>
    <PopupWithForm isOpen={profilePopupOpen} onClose={() => setProfilePopupOpen(false)} name='profile' title='Редактировать профиль'>
        <input type="text" id="name" className="form__input form__input_type_name" name="name"
                    placeholder="Имя" minLength="2" maxLength="30" required />
            <span id="name-error" className="form__input-error"></span>
        <input type="text" id="role" className="form__input form__input_type_role" name="about"
                    placeholder="Профессия" minLength="2" maxLength="30" required />
            <span id="role-error" className="form__input-error"></span>
    </PopupWithForm>
    <PopupWithForm isOpen={newCardPopupOpen} onClose={() => setNewCardPopupOpen(false)} name='images' title='Новое место'>
        <input type="text" id="name-card" className="form__input form__input_type_title" placeholder="Название"
                    name="title" minLength="2" maxLength="30" required />
            <span id="name-card-error" className="form__input-error"></span>
        <input type="url" id="link" className="form__input form__input_type_link" placeholder="ссылка на картинку"
                    name="link" required />
            <span id="link-error" className="form__input-error"></span>
    </PopupWithForm>
    <ImagePopup card={imagePopupOpen} onClose={() => setImagePopupOpen(false)} />
    </main>
    )
}

export default Main;