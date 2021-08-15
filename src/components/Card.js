import React from 'react';
import deleteImg from '../images/delete.svg';
import likeImg from '../images/Group.svg';


const Card = ({link, name, likes, onCardClick}) => {
    const handleClick = () => onCardClick(link, name)
    return (
        <article className="element">
            <button type="button" className="element__delete">
                <img src={deleteImg} className="element__img-delete" alt="Удалить" />
            </button>
            <img src={link} className="element__img"
                alt="Картинка" onClick={handleClick}/>
            <div className="element__block">
                <h2 className="element__title">{name}</h2>
                <button type="button" className="element__like-btn">
                    <img src={likeImg} className="element__group" alt="Лайк" />
                    <p className= "element__like_number">{likes.length}</p>
                </button>
            </div>
        </article>
    )
}

export default Card;