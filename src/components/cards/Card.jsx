import React from 'react'
import './Card.css'


const Card = ({card,disapled,handleClickedChoice,flipped}) => {
    return (
        <div className={`game-block ${flipped?"is-flipped":""}`} disapled={disapled}>
            <div className="face front" onClick={() => handleClickedChoice(card)}></div>
            <div className="face back">
                <img src={card.src} alt="" />
            </div>
        </div>
    )
}

export default Card
