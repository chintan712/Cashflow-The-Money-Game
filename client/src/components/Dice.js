import React from 'react'
import d1 from './images/dice_im/dice_1.png';
import './diceStyle.css'

export const Dice = () => {
    return (
        <>
        <div className="dice_container">
            <img src={d1}  alt=""  />
        </div>

        </>

    )
}
export default Dice;