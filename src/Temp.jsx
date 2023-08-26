import React, { useState } from 'react';

import './Temp.css'; // Import the CSS file for styling

const API_KEY = "1837eecd2816ddf7cd33d2d9f9315d7f"; // Replace with your API key

function Temp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null); // State for forecast data
  const [error, setError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      console.log(data);
      setError(null);

      if (data.main) {
        setWeatherData(data);
        if (data.coord) {
            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API_KEY}&units=metric`);
            const forecastData = await forecastResponse.json();
            setForecastData(forecastData);
        }
        
      } else {
        setError('City not found');
        setWeatherData(null);
        setForecastData(null);
      }
      
    } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Error fetching weather data');
        setWeatherData(null);
        setForecastData(null);
    }  
  };

  return (
    <div className="Temp" >
      <form onSubmit={handleSubmit} className="flex items-center rounded-2xl w-3/6 ml-1 absolute top-2" id='inputForm'>
      <span className="material-symbols-outlined" id="search-icon">
              search
              </span>
        <input
          id="cityinput"
          className="py-3 px-1 w-11/12"
          type="text"
          placeholder="Enter location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {weatherData && (
        <div>
          <div className="weather-details px-4 py-2 rounded-xl" id='wetinfo'>
            <div id='tempIcon'>
              <div id='Location'>
                <span class="material-symbols-outlined">
                pin_drop
                </span>
                <h1 id='searchName'>{weatherData.name}, {weatherData.sys.country}</h1>
              </div>
                
                <div className="weather-icon">
                    <img src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather Icon" id='iconWet' />
                </div>
            </div>
                
            <div id='mainData'>
                <div className='realHumidity'>
                    <p>
                      <span class="material-symbols-outlined">humidity_percentage
                      </span> &nbsp;Humidity: &nbsp;  
                      <span className='tempDetails'> {weatherData.main.humidity}%</span></p>

                    <p>
                      <span class="material-symbols-outlined">
                        speed
                        </span> &nbsp;Wind Speed: &nbsp; 
                        <span className="tempDetails">{weatherData.wind.speed} m/s</span></p>
                </div>

                <div id='realTemp'>
                <p>
                  <span class="material-symbols-outlined">
                    device_thermostat
                    </span> &nbsp;Temperature: &nbsp; 
                    <span className='temp'>{weatherData.main.temp} °C</span></p>
                    <div id='tempRange'>
                        <p>Max: &nbsp;<span className='tempR'>{weatherData.main.temp_max} °C</span></p>&nbsp;
                        <p>Min: &nbsp;<span className='tempR'>{weatherData.main.temp_min} °C</span></p>
                    </div>
                </div>
            </div>
        </div>

        <div className='infoTemp'>
          <div>
            <div className='extraInfo'>
              <div className='extra'>
                <p>
                  <span class="material-symbols-outlined">
                  ar_on_you
                  </span>Feels Like</p>
                  <p>{weatherData.main.feels_like}°C</p>
              </div>

              <div className='extra'>
                <p>
                  <span class="material-symbols-outlined">
                  compare_arrows
                  </span>Pressure</p>
                  <p>{weatherData.main.pressure} hPa</p>
              </div>
            </div>
          </div>

          <div>
            <div className='sunTimes'>
              <div className='sunrise'>
                <p>
                  <span class="material-symbols-outlined">
                  wb_sunny
                  </span>Sunrise</p>
                  <p>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
              </div>

              <div className="sunset">
                <p>
                <span class="material-symbols-outlined">
                wb_twilight
                </span>Sunset</p>
                <p>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
        
      )}
      
      {forecastData && (
        <div className="forecast-container rounded-xl flex justify-between items-center">
          <h2>Forecast</h2>
          <div className="forecast-item px-3 rounded-xl forecast">
            <div className="foreDate">
              <div className="weather-icon">
                <img src={`https://openweathermap.org/img/w/${forecastData.list[1].weather[0].icon}.png`} alt="Weather Icon" id='iconWet' />
              </div>
            </div>
            <hr />
            <p>Date: {new Date(forecastData.list[1].dt * 1000).toLocaleDateString()}</p>
            <div className="foreTemp">
              <p>Temperature: {forecastData.list[1].main.temp}°C&#40;{forecastData.list[1].main.temp_max}°C/{forecastData.list[1].main.temp_min}°C &#41; </p>
            </div>
              <p>Humidity: {forecastData.list[1].main.humidity} °C</p>
              <p>Weather: {forecastData.list[1].weather[0].description}</p>
          </div>

          <div className="forecast-item px-3 rounded-xl forecast1">
            <div className="foreDate">
              <div className="weather-icon">
                <img src={`https://openweathermap.org/img/w/${forecastData.list[2].weather[0].icon}.png`} alt="Weather Icon" id='iconWet' />
              </div>
            </div>
            <hr />
            <p>Date: {new Date(forecastData.list[2].dt * 1000).toLocaleDateString()}</p>
            <div className="foreTemp">
              <p>Temperature: {forecastData.list[2].main.temp}°C&#40;{forecastData.list[2].main.temp_max}°C/{forecastData.list[2].main.temp_min}°C &#41;</p>
            </div>
              <p>Humidity: {forecastData.list[2].main.humidity} °C</p>
              <p>Weather: {forecastData.list[2].weather[0].description}</p>
          </div>

          <div className="forecast-item px-3 rounded-xl forecast2">
            <div className="foreDate">
              <div className="weather-icon">
                <img src={`https://openweathermap.org/img/w/${forecastData.list[3].weather[0].icon}.png`} alt="Weather Icon" id='iconWet' />
              </div>
            </div>
            <hr />
            <p>Date: {new Date(forecastData.list[3].dt * 1000).toLocaleDateString()}</p>
            <div className="foreTemp">
              <p>Temperature: {forecastData.list[3].main.temp}°C&#40;{forecastData.list[3].main.temp_max}°C/{forecastData.list[3].main.temp_min}°C &#41;</p>
            </div>
              <p>Humidity: {forecastData.list[3].main.humidity} °C</p>
              <p>Weather: {forecastData.list[3].weather[0].description}</p>
          </div>

          <div className="forecast-item px-3 rounded-xl forecast3">
            <div className="foreDate">
              <div className="weather-icon">
                <img src={`https://openweathermap.org/img/w/${forecastData.list[4].weather[0].icon}.png`} alt="Weather Icon" id='iconWet' />
              </div>
            </div>
            <hr />
            <p>Date: {new Date(forecastData.list[4].dt * 1000).toLocaleDateString()}</p>
            <div className="foreTemp">
              <p>Temperature: {forecastData.list[4].main.temp} °C &#40;{forecastData.list[4].main.temp_max}°C / {forecastData.list[4].main.temp_min}°C &#41;</p>
            </div>
              <p>Humidity: {forecastData.list[4].main.humidity} °C</p>
              <p>Weather: {forecastData.list[4].weather[0].description}</p>
          </div>

          <div className="forecast-item px-3 rounded-xl forecast4">
            <div className="foreDate">
              <div className="weather-icon">
                <img src={`https://openweathermap.org/img/w/${forecastData.list[5].weather[0].icon}.png`} alt="Weather Icon" id='iconWet' />
              </div>
            </div>
            <hr />
            <p>Date: {new Date(forecastData.list[5].dt * 1000).toLocaleDateString()}</p>
            <div className="foreTemp">
              <p>Temperature: {forecastData.list[5].main.temp} °C &#40;{forecastData.list[4].main.temp_max}°C / {forecastData.list[4].main.temp_min}°C &#41;</p>
            </div>
              <p>Humidity: {forecastData.list[5].main.humidity} °C</p>
              <p>Weather: {forecastData.list[5].weather[0].description}</p>
          </div>
        </div>
      )}
      </div>

  );
}

export default Temp;
