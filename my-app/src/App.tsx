import React, { useState } from 'react';
import { json } from 'stream/consumers';
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
          <input type='text'
            placeholder='Book Search'
            onChange={(event) => {
              setBook(event.target.value.replace(' ', '+'));
            }}
          />
        </div>
        <br />
        <br />
      </form>
      {result.map(items => (
        <div className='grid-container'>
          <div className='grid-item'>
            <img src={items.volumeInfo.imageLinks.thumbnail} alt={items.volumeInfo.title} />
            <p>{items.volumeInfo.title}</p>
            <p>{items.volumeInfo.authors}</p>
            <p>{items.volumeInfo.description.substring(0, 300) + '...'}</p>
            <a href={items.volumeInfo.previewLink}>Link</a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
