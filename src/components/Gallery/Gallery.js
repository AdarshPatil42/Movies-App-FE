import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import "../Gallery/Gallery.css";
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';




const Gallery = () => {
  const [getMovies, setGetMovies] = useState([]);
  const navigate = useNavigate();

  // for get all movie list
  useEffect(() => {
    getAllMovies();
  },[])

  const getAllMovies = async () => {
    try {
      const movies = await axios.get("http://localhost:4000/api/movies/all", {
        headers: {
          authorization: JSON.parse(localStorage.getItem('token'))
        }
      });
      setGetMovies(movies.data.movies)
    } catch (error) {
      alert("You don't have Permission..!")
      navigate("/")
    }
  }

  // search movies

  const searchHandle = async (e) => {
    // console.log(e.target.value)
    try {
      let key = e.target.value;
      if (key) {
        const movie = await axios.get(`http://localhost:4000/api/movies/search/${key}`, {
          headers: {
            authorization: JSON.parse(localStorage.getItem('token'))
          }
        });
        console.log(movie)
        if (movie) {
          setGetMovies(movie.data);
        }
      }
      else {
        getAllMovies();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (

    <div className='gallery_body'>
      <div>
        <Form className="d-flex container py-4 col-6">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={searchHandle}
          />
          <Button variant="outline-primary">Search</Button>
        </Form>
      </div>
      <div className='gallery min-vh-100'>
        <div className='container-lg'>
          <div className='row gy-3 row-cols-1 row-cols-sm-2 row-cols-md-3' >
            {
              getMovies.length > 0 ? getMovies.map((movie, ind) => {

                return (

                  <div className='col' key={ind} onClick={() => navigate(`/singlemovie/${movie._id}`)} >
                    <Card className=''>
                      <Card.Img className='card_img' variant="top" src={movie.img} alt='img' />
                      <Card.Body >
                        <Card.Title>{movie.movieName}</Card.Title>
                        <Card.Text>
                          {/* Action, Drama, Thriller */}
                          {movie.categories}
                        </Card.Text>
                      </Card.Body >
                      <ListGroup className="list-group-flush">
                        <ListGroup.Item>Year: {movie.year}</ListGroup.Item>
                        <ListGroup.Item>Duratioin: {movie.runtime} min</ListGroup.Item>
                        <ListGroup.Item>Rating: <FaStar /> <FaStar /> <FaStar /></ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </div>
                )
              })
                : <h1>Movies Not Found..!</h1>
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery
