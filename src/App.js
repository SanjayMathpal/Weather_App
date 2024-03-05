import { useEffect, useState } from 'react'
import './App.css';
import searchIcon from './assets/icon.png';
import notFound from './assets/notFound.png';

function App() {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=haldwani&appid=1d5280fea8f76b758d6b121c238f2287')
      const data = await response.json()
      setWeather(data)
    }

    fetchData();
  }, []);

  const obj = {
    main: {
      temp: 273.15,
      feels_like: 273.15,
      pressure: 0,
      humidity: 0
    },
    name: "Invalid Input",
    wind: {
      speed: 0
    }
  }

  const fetchData = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1d5280fea8f76b758d6b121c238f2287`)
    const data = await response.json()
    if (data && data.main && data.main.temp) {
      setWeather(data);
    } else {
      console.log(obj);
      setWeather(obj);
    }
  }

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetchData();
  };

  return (
    <>
    <div className='body'>
      <header className="header">
        <h1 className='title'>Weather App</h1>
      </header>
      <div className="search">
        <input type="text" placeholder="Enter the city name" value={city}
          onChange={handleCityChange} />
        <img onClick={handleSearch} src={searchIcon} alt="" />
      </div>
      <section>
        <div className='cityName'>
          <p>{weather?.name} ({weather?.sys?.country})</p>
        </div>
        <div className="content">
          <img src={weather.weather && weather.weather.length > 0 ? `https://openweathermap.org/img/w/${weather.weather[0].icon}.png` : notFound} alt="weatherIcon" />

          <div className="temperature">
            <div className="temp">
              <h2>Curr Temp. :- </h2>
              <h3>{Number(weather.main?.temp - 273.15).toFixed(1)}°C</h3>
            </div>
            <div className="temp">
              <h2>Feels Like :- </h2>
              <h3>{Number(weather.main?.temp - 273.15).toFixed(1)}°C</h3>
            </div>
          </div>

          <div className="additional">
            <div className="temp">
              <h3>Wind Speed :- </h3>
              <h4>{weather.wind?.speed}</h4>
            </div>
            <div className="temp">
              <h3>Humidity :- </h3>
              <h4>{weather.main?.humidity}</h4>
            </div>
            <div className="temp">
              <h3>Pressure :- </h3>
              <h4>{weather.main?.pressure}</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
    <footer>
        <p>
          Copyright 2024 Made by Sanjay
        </p>
      </footer>
    </>
  );
}

export default App;
