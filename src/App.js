import { useEffect, useState } from 'react';
import './App.css';
import ImageTile from './ImageTile';
import config from './config';

function App() {
  let initialStartDate = new Date();
  initialStartDate.setDate(initialStartDate.getDate() - 10);
  const [startDate, setStartDate] = useState(initialStartDate.toLocaleDateString('en-CA'));
  const [endDate, setEndDate] = useState((new Date()).toLocaleDateString('en-CA'));
  const [images, setImages] = useState([]);

  async function getImages() {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${config.API_KEY}&start_date=${startDate}&end_date=${endDate}`);
    const data = await response.json();
    // if only one item is returned, data is an object. If two or more items, data is an array.
    const imagesArray = [].concat(data);
    setImages(imagesArray.filter((image) => image.media_type === 'image'));
  }

  useEffect(() => {
    getImages();
  }, []);

  const handleStartDateChange = () => {
    console.log(' start change');
  }

  const handleEndDateChange = () => {
    console.log('end change');
  }

  return (
    <div className="App">
      <nav>
        <i className="fas fa-user-astronaut"></i>
        Spacetagram
      </nav>
      <main>
        <p className="results">Currently showing {images.length === 1 ? `${images.length} image` : `${images.length} images`} from <input type="date" value={startDate} onChange={handleStartDateChange}/> to <input type="date" value={endDate} onChange={handleEndDateChange}/></p>
        <div className="images">
          {images.map((image, index) => {
            return (
              <ImageTile key={index} image={image} />
            );
          })}
        </div>
      </main>
      <footer>
        <p>Images from <a href="https://api.nasa.gov/#browseAPI" target="_blank" rel="noreferrer">NASA's Astronomy Picture of the Day</a>, which, according to NASA, "has the popular appeal of a Justin Bieber video".</p>
        <a className="github" title="GitHub" href="https://github.com/lindsaysofia" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
      </footer>
    </div>
  );
}

export default App;
