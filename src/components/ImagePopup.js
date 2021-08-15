import closePopupImg from '../images/CloseIcon.svg';
import cardImg from '../images/kirill-pershin-1088404-unsplash.png';


function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_img ${card && 'popup_opened'}`}>
            <div className="popup__container popup__container_img">
                <button type="button" className="popup__close popup__close_img" onClick={onClose}>
                    <img src={closePopupImg} alt="Крестик" />
                </button>
                <img src={cardImg} className="popup__img" alt="фото" />
                {/* <h2 className="popup__title">{card.name}</h2> */}
            </div>
        </div>
    )
}

export default ImagePopup;