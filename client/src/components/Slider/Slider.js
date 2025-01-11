import React, { Profiler, useState } from "react";
import "./Slider.css";
import BtnSlider from "./BtnSlider";
import dataSlider from "./dataSlider";
import First from "../GameLayout";


export default function Slider(props) {
  const [slideIndex, setSlideIndex] = useState(1);


  const nextSlide = () => {
    if (slideIndex !== dataSlider.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === dataSlider.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(dataSlider.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  return (
    <div className="trygrid">
      <div className="container-slider">
        <br/>
        <h1>CHOOSE YOUR DREAM!</h1>
        {dataSlider.map((obj, index) => {
          return (
            <div
              key={obj.id}
              className={
                slideIndex === index + 1 ? "slide active-anim" : "slide"
              }
            >
              <br/>
              <h3>{obj.title}</h3> <br/>
              <p>{obj.description}</p>
            </div>
          );
        })}
        <BtnSlider moveSlide={nextSlide} direction={"next"} />
        <BtnSlider moveSlide={prevSlide} direction={"prev"} />

        <div className="container-dots">
          {Array.from({ length: 14 }).map((item, index) => (
            <div
              onClick={() => moveDot(index + 1)}
              className={slideIndex === index + 1 ? "dot active" : "dot"}
            ></div>
          ))}
        </div>
      </div>
      <div className="proftitle" >
        <p>You are {props.work_playerGL.title}.</p>
        <p>Your salary is {props.work_playerGL.salary}.</p>
        {props.work_playerGL.description} <br/>
        <p>You have ₹{props.work_playerGL.starting_cash} at starting.</p><br />
     </div>
    </div>
  );
}

