import React from 'react';
//import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link} from "react-router-dom"

import HomeView from './home';
import GalleryView from './gallery';
import ListView from './list';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Link to ="/"> home </Link>
        <Link to ="/gallery"> Gallery Panel </Link>
        <Link to ="/list"> Search Panel </Link>
          <Routes>
            <Route path = "/" element = {<HomeView></HomeView>}/>
            <Route path = "/gallery" element = {<GalleryView></GalleryView>}/>
            <Route path = "/list" element = {<ListView></ListView>}/>
          </Routes>
      </header>
    </div>
    </Router>
  );
}

export default App;
