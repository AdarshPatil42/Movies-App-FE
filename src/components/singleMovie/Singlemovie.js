import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './Singlemovie.css';
import { FaStar, FaEdit, FaRegTrashAlt, FaPlus } from "react-icons/fa";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';



const Singlemovie = () => {
  const [singleMovie, setSingleMovie] = useState([]);

  // for Add new movie
  const [movies, setMovies] = useState({
    img: "",
    movieName: "",
    year: "",
    runtime: "",
    categories: ""
  })

  // for update
  const [updateMovies, setUpdateMovies] = useState({
    img: "",
    movieName: "",
    year: "",
    runtime: "",
    categories: ""
  })
  const { id } = useParams();
  const navigate = useNavigate();

  // for Add new movies
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // for update movie
  const [showUpdate, setShowUpdate] = useState(false);

  const updateHandleClose = () => setShowUpdate(false);
  const updateHandleShow = () => setShowUpdate(true);


  // Add new movies
  const onTextChange = (e) => {
    setMovies({
      ...movies,
      [e.target.name]: e.target.value
    })
  }

  const AddMovies = async (e) => {
    e.preventDefault();
    try {
      const Movies = await axios.post("http://localhost:4000/api/movies/add", movies, {
        headers: {
          authorization: JSON.parse(localStorage.getItem('token'))
        }
      });
      if (Movies) {
        alert("New Movies Added Successfully..!");
      } else {
        alert("Please fill valid details.");
      }
      navigate('/gallery');
    } catch (error) {
      alert("You don't have Permission..!")
    }
  }

  // get single movie
  useEffect(() => {
    getMovie();
  })

  const getMovie = async () => {
    try {
      const movie = await axios.get(`http://localhost:4000/api/movies/singleMovie/${id}`);
      // console.log(movie.data)
      setSingleMovie(movie.data);
    } catch (error) {
      console.log(error);
    }
  }
  const movie = [singleMovie];

  // delete movie

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/movies/delete/${id}`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem('token'))
        }
      })
      alert("Are sure to Delete..!");
      navigate("/gallery");
    } catch (error) {
      alert("You don't have Permission..!")
      navigate("/gallery")
    }

  }

  // update movie 
  const onUpdateTextChange = (e) => {
    setUpdateMovies({
      ...singleMovie,
      [e.target.name]: e.target.value
    })
  }

  const updateMoviesHandle = async (e) => {
    e.preventDefault();
    try {
      const movie = await axios.put(`http://localhost:4000/api/movies/update/${id}`, updateMovies, {
        headers: {
          authorization: JSON.parse(localStorage.getItem('token'))
        }
      });
      if (movie) {
        alert("Movies Update Successfully..!");
      } else {
        alert("Please fill valid details.");
      }
      navigate('/gallery');
    } catch (error) {
      console.log(error)
      alert("You don't have Permission..!")
    }
  }

  return (
    <div className='card_body'>
      <div className=' d-flex justify-content-end '>
        <button className='btn_add' onClick={handleShow}><FaPlus /></button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Movies</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Poster URL
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Enter url" name='img' onChange={(e) => onTextChange(e)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Movie Name
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Enter Movie name" name='movieName' onChange={(e) => onTextChange(e)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Year
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Enter Realise Year" name='year' onChange={(e) => onTextChange(e)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Run Time
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Enter Runtime" name='runtime' onChange={(e) => onTextChange(e)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Categories
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Enter Categories" name='categories' onChange={(e) => onTextChange(e)} />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => AddMovies(e)}>ADD</Button>
        </Modal.Footer>
      </Modal>


      <div className='card_one'>
        {
          movie.map((element, ind) => {
            return (
              <Card style={{ width: '30rem' }} key={ind} >
                <Card.Img className='card_img1' variant="top" src={element.img} />
                <Card.Body >
                  <Card.Title className='icon'><span>{element.movieName}</span> <span><FaEdit onClick={updateHandleShow} /> <FaRegTrashAlt onClick={() => deleteMovie(element._id)} /></span> </Card.Title>
                  <Card.Text>
                    {element.categories}
                  </Card.Text>
                </Card.Body >
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Year: {element.year}</ListGroup.Item>
                  <ListGroup.Item>Duratioin:{element.runtime} min</ListGroup.Item>
                  <ListGroup.Item>Rating: <FaStar /> <FaStar /> <FaStar /> </ListGroup.Item>
                </ListGroup>
              </Card>
            )
          })
        }

        <Modal
          show={showUpdate}
          onHide={updateHandleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Movies</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                  Poster URL
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" placeholder="Enter url" name='img' onChange={(e) => onUpdateTextChange(e)} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                  Movie Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" placeholder="Enter Movie name" name='movieName' onChange={(e) => onUpdateTextChange(e)} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-4" controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                  Year
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" placeholder="Enter Realise Year" name='year' onChange={(e) => onUpdateTextChange(e)} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                  Run Time
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" placeholder="Enter Runtime" name='runtime' onChange={(e) => onUpdateTextChange(e)} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                  Categories
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" placeholder="Enter Categories" name='categories' onChange={(e) => onUpdateTextChange(e)} />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={(e) => updateMoviesHandle(e)}>Update</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default Singlemovie
