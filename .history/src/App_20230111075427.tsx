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
import ItemDetails from './details';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <div style={{
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'space-between'
        }}>
          <Link to ="/" style={{ color: 'grey', marginRight: "80px", fontFamily: 'Georigia'}}> Home Page </Link>
          <Link to ="/gallery" style={{ color: 'grey', marginRight: "80px", fontFamily: 'Georigia' }}> Gallery Panel </Link>
          <Link to ="/list" style={{ color: 'grey', fontFamily: 'Georigia' }}> Search Panel </Link>
        </div>
          <Routes>
            <Route path = "/" element = {<HomeView></HomeView>}/>
            <Route path = "/gallery" element = {<GalleryView></GalleryView>}/>
            <Route path = "/list" element = {<ListView></ListView>}/>
            <Route path="/items/:itemId" element={<ItemDetails></ItemDetails>} />
          </Routes>
      </header>
    </div>
    </Router>
  );
}

export default App;
