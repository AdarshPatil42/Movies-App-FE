import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import './App.css';
import Carousel from "./components/carousel/Carousel";
import Signin from "./components/forms/Signin";
import Signup from "./components/forms/Signup";
import Navbar from "./components/navbar/Navbar";
import Gallery from "./components/Gallery/Gallery"
import Footer from "./components/footer/Footer";
import Singlemovie from "./components/singleMovie/Singlemovie";
import PageNotFound from "./components/404 page/pageNotFound";


function App() {
  return (
    <BrowserRouter>
      <Carousel />
      <Navbar />
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/singlemovie/:id" element={<Singlemovie />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
