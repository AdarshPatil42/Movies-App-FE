import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "../carousel/Carousel.css";

const MovieCarousel = () => {
  return (
    <div className='carousel_Body'>
      <Carousel >
        <Carousel.Item>
          <img
            className="d-block w-100 carousel_img"
            src="https://1.bp.blogspot.com/-BfuHZ48NDcE/YAwVu0QbIxI/AAAAAAAACVw/X248_41KU6EL39ADksxdV2Lp79c3emoUwCLcBGAsYHQ/s1172/kgf%2B2.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel_img"
            src="https://images.news18.com/ibnlive/uploads/2021/01/1611818353_pushpa-1.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel_img"
            src="https://i.ytimg.com/vi/l47_zQ-4Jyw/maxresdefault.jpg"
            alt="Third slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel_img"
            src="https://i.ytimg.com/vi/cZCzu12AlWQ/maxresdefault.jpg"
            alt="Fourth slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel_img"
            src="https://i.ytimg.com/vi/cZCzu12AlWQ/maxresdefault.jpg"
            alt="Fourth slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  )
}



export default MovieCarousel;
