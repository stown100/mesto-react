import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


const EditAvatarPopup = ({avatarPopupOpen, setAvatarPopupOpen, onUpdateAvatar}) => {
    const { currentUser } = React.useContext(CurrentUserContext);
    const [avatarValue, setAvatarValue] = React.useState('')

        // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setAvatarValue(currentUser.avatar)
    }, [currentUser]);

    function handleChangeAvatar(e) {
        setAvatarValue(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: avatarValue,
        });
      } 

    return (
        <PopupWithForm isOpen={avatarPopupOpen} onClose={() => setAvatarPopupOpen(false)} onSubmit={handleSubmit}
        name='avatar' title='Обновить аватар' button='Сохранить'>
          <input type="url" id="avatar" className="form__input form__input_type_avatar" name="avatar"
            placeholder="ссылка на аватар" value={avatarValue} onChange={handleChangeAvatar} required />
          <span id="avatar-error" className="form__input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;