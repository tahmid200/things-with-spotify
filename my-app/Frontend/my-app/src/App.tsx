import React from 'react';
import './App.css';

function App() {
  return (
    <div className='app'>
      <div>
        <h1>Things With Spotify</h1>
      </div>
        <input className='search-bar' type='text' placeholder='Search Artist'/>
        <button className='search-button'>Search</button>
    </div>
  );
}

export default App;
