import React, { useState } from 'react';
import { json } from 'stream/consumers';
import { makeStyles } from '@mui/material';
import Paper from '@mui/material/';
import Grid from '@mui/material/Grid';


import $ from 'jquery';
import './App.css';

const App = () => {


  const [book, setBook] = useState<string | undefined>();
  const [result, setResult] = useState<any[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    $.get("https://www.googleapis.com/books/v1/volumes?q=" + book + "&maxResults=8")
      .then(data => {
        setResult(data.items);
      })
  }

  return (
    <div className="App">
      <h1>Google Book Search</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input className='search' type='text'
            placeholder='Book Search'
            onChange={(event) => {
              setBook(event.target.value.replace(' ', '+'));
            }}
          />
        </div>
        <br />
        <br />
      </form>
      <div className='grid-style'>
      <Grid  container spacing={3}>
        {result.map(items => (
          <Grid className='card' item xs={12} sm={6} md={3}>
            <div>
              <div>
            <img className='image-style' src={items.volumeInfo.imageLinks.thumbnail} alt={items.volumeInfo.title} />
            </div>
            <p className='title-style'>{items.volumeInfo.title}</p>
            <p className='author-style'>{items.volumeInfo.authors}</p>
            <p className='description-style'>{items.volumeInfo.description.substring(0, 300) + '...'}</p>
            <a className='link-button' href={items.volumeInfo.previewLink}>Get Book</a>
            </div>
          </Grid>
        ))}
      </Grid>
      </div>

    </div>
  );
}

export default App;
