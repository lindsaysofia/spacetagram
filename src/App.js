import { useEffect, useState } from 'react';
import './App.css';
import ImageTile from './ImageTile';
import config from './config';

function App() {
  const today = (new Date()).toLocaleDateString('en-CA');
  //start calendar 15 days from current date
  let initialStartDate = new Date();
  initialStartDate.setDate(initialStartDate.getDate() - 15);
  initialStartDate = initialStartDate.toLocaleDateString('en-CA');
  const [dates, setDates] = useState([initialStartDate, today]);
  const [images, setImages] = useState([]);

  async function getImages() {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${config.API_KEY}&start_date=${dates[0]}&end_date=${dates[1]}`);
    const data = await response.json();
    // if only one item is returned, data is an object. If two or more items, data is an array.
    const imagesArray = [].concat(data);
    setImages(imagesArray.filter((image) => image.media_type === 'image'));
  }

  useEffect(() => {
    getImages();
  }, [dates]);

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    if (newStartDate > initialStartDate || newStartDate < '1995-06-16') {
      return;
    }
    let newEndDate = new Date(newStartDate);
    newEndDate.setDate(newEndDate.getDate() + 15);
    setDates([newStartDate, newEndDate.toLocaleDateString('en-CA')]);
  };

  const toggleLike = (e) => {
    e.preventDefault();
    if (e.target !== this) {
      if (e.target.textContent === '') {
        e.target = e.target.parentNode;
      }
    }
    e.target.innerHTML = e.target.textContent === ' like' ? '<i class="fas fa-heart"></i> unlike':'<i class="far fa-heart"></i> like';
  };

  return (
    <div className="App">
      <nav>
        <i className="fas fa-user-astronaut"></i>
        Spacetagram
      </nav>
      <main>
        <p className="results">Currently showing {images.length === 1 ? `${images.length} image` : `${images.length} images`} from <input type="date" value={dates[0]} onChange={handleStartDateChange}/> to {(new Date(dates[1])).toDateString()}*</p>
        <p className="note">*<em>Image results displayed below are within 15 days after the date selected</em></p>
        <div className="images">
          {images.map((image, index) => {
            return (
              <ImageTile key={index} image={image} toggleLike={toggleLike} />
            );
          })}
        </div>
      </main>
      <footer>
        <p>Images brought to you from <a href="https://api.nasa.gov/#browseAPI" target="_blank" rel="noreferrer">NASA's Astronomy Picture of the Day</a>, which, according to NASA, "has the popular appeal of a Justin Bieber video".</p>
        <p>Made with <i className="fas fa-heart"></i> by <a href="https://lindsaysofia.github.io/personal-website/" target="_blank" rel="noreferrer">Lindsay Lopez</a></p>
      </footer>
    </div>
  );
}

export default App;
