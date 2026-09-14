import React from 'react'

const CurrentWeatherCard = (props) => {
  const weatherData = props.weatherData
  console.log("weather Data = ", props.weatherData)
  const degreesToDirection = () => {
    const directions = [
      "North",
      "Northeast",
      "East",
      "Southeast",
      "South",
      "Southwest",
      "West",
      "Northwest"
    ];

    const index = Math.round(Number(weatherData.current.wind_direction) / 45) % 8;

    return directions[index];
  }

  return (
    <div className='weather-card'>
      <h3>Current Weather</h3>
      <div className="current-card">
        <div className="top">
          <p className="location">
            {props.location.name} 
            {/* {weatherData.country} */}
          </p>
        </div>

        <div className="mid">
          {/* <img src={weatherData.weather_icon} alt={weatherData.weather_icon} /> */}
        </div>

        <div className="bottom">
          <div className="bototm-left">
            <span>{weatherData.current.temperature}°C</span>
            {/* <p>{weatherData.desc}</p> */}
          </div>

          <span>
            {degreesToDirection()}, {weatherData.current.wind_speed} Km/h
          </span>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeatherCard
