import React, { useState, useEffect } from 'react'

const CurrentWeatherCard = (props) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const weatherData = props.weatherData

  
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

  const getDateTime = () => {
    const now = currentTime;

    const dayName = now.toLocaleDateString("en-US", {
      weekday: "long"
    });

    const date = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

    return {
      dayName,
      date,
      time
    };
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='weather-card flex flex-col justify-center items-center bg-gray-100 text-white w-sm p-2 rounded-xl'>

      <span className='w-full text-black font-medium text-lg my-3'>Current Weather</span>

      <div className="current-card w-full p-2 flex flex-col justify-center items-center rounded-xl bg-linear-to-r from-gray-200 to-gray-300">

        <div className="top w-full flex flex-row justify-between">

          <span className="location">
            {props.location.name}
          </span>

          <p className="date-time flex flex-col text-right">
            <span className="date">
              {getDateTime().dayName}, {getDateTime().date}
            </span>

            <span className="time">
              {getDateTime().time}
            </span>
          </p>

        </div>

        <div className="mid w-full h-10">

        </div>

        <div className="bottom flex flex-row justify-between w-full">
          <div className="bototm-left">
            <span>{weatherData.current.temperature}°C</span>
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
