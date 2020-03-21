import React, { useState } from "react";
import "./slider.scss";


function Slider(props){
  let sliderArr = props.movies;
  let low = 5;
  let high = sliderArr.length;

  const [x, setX] = useState(0);


  //left transition
  const goLeft = () => {
    x < 0 ? setX(x + 200) : setX(x);
  }

  //right transition
  const goRight = () => {
    console.log(x);

    x <= -100 * (sliderArr.length - 14) ? setX(0) : setX(x - 200);
  }

  //hover item scale and transition all left or right of it
  const mouseIn = (e) => {
    const parent = e.target.parentElement.children;
    let left = true;
    for (let child = 0; child < parent.length - 2; child++){
      if (parent[child] == e.target){
        left = false;
      }
      else if (left){
        parent[child].style.transform = `translateX(${x - 25}%)`;
      }
      else{
        parent[child].style.transform = `translateX(${x + 25}%)`;
      }
    }
    e.target.style.transform = `translateX(${x}%) scale(1.5)`
  }

  //restore scale and transition of items left and right
  const mouseOut = (e) => {
    const parent = e.target.parentElement.children;
    let left = true;
    for (let child = 0; child < parent.length - 2; child++){
      if (parent[child] == e.target){
        left = false;
      }
      else if (left){
        parent[child].style.transform = `translateX(${x}%)`;
      }
      else{
        parent[child].style.transform = `translateX(${x}%)`;
      }
    }
    e.target.style.transform = `translateX(${x}%)`
  }



  return(
    <div className="slider-box">
      <div className="slider">
        {sliderArr.map((item, index) => {
          return(
            <img
              key={index}
              className="slide"
              onMouseOver={mouseIn}
              onMouseOut={mouseOut}
              src={item.poster} alt={item.title}
              style={{
                transform: `translateX(${x}%)`
              }}
              >
            </img>
          )
        })}
        <svg
          className="bi bi-chevron-left prev"
          width="2em" height="2em" viewBox="0 0 16 16"
          fill="currentColor" xmlns="http://www.w3.org/2000/svg"
          onClick={goLeft}
          >
          <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z" clipRule="evenodd"/>
        </svg>
        <svg className="bi bi-chevron-right next"
          width="2em" height="2em" viewBox="0 0 16 16"
          fill="currentColor" xmlns="http://www.w3.org/2000/svg"
          onClick={goRight}
          >
          <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z" clipRule="evenodd"/>
        </svg>

      </div>
    </div>
  )
}

export default Slider;
