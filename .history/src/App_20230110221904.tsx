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

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Link to ="/"> home </Link>
        <Link to ="/gallery"> gallery </Link>
          <Routes>
            <Route path = "/" element = {<HomeView></HomeView>}/>
            <Route path = "/gallery" element = {<GalleryView></GalleryView>}/>
          </Routes>
      </header>
    </div>
    </Router>
  );
}

export default App;
