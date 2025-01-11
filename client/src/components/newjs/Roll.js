import React from 'react'
import d1 from '../images/dice_im/dice_1.png';
import d2 from '../images/dice_im/dice_2.png';
import d3 from '../images/dice_im/dice_3.png';
import d4 from '../images/dice_im/dice_4.png';
import d5 from '../images/dice_im/dice_5.png';
import d6 from '../images/dice_im/dice_6.png';
import "animate.css";
import  {motion} from 'framer-motion';

const imgs = [d1,d2,d3,d4,d5,d6];
const dic = document.querySelectorAll("img.dice_1");
var dievalue ;
function roll() {
    
    dic.forEach(function(di) {
      di.classList.add("shake");
    });
    setTimeout(function(){
      dic.forEach(function(di) {
        di.classList.remove("shake");
      });
      dievalue = Math.floor(Math.random()*6);
      const d = document.getElementsByClassName("dice_1")[0];
      d.setAttribute("src", imgs[dievalue]);
      
    },
    1000
    );

}


class Roll extends React.Component {   

    onTrigger = (event) => {
        this.props.parentCallback(dievalue);
        event.preventDefault();
        
    } 
render() {
    return (
        <div>
            <div className="roll">                            
                <motion.img 
                className="dice_1" src={d1}  alt="" 
                initial= {{y: '-100vw'}}
                animate = {{y: 0 , flip: true , }}
                transition = {{ delay: 0.5 }}
                />          

                    <button className="game-button-roll red" onClick={(e) => { roll();  this.onTrigger(e); } } > 
                    ROLL
                    </button> {dievalue}         
            </div>
        </div>
    )
}
}
export default Roll;
