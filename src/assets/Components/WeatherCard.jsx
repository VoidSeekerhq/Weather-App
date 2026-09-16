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
    <div className='weather-card flex flex-col justify-center items-center bg-(--surface-color1) text-white w-sm p-2 rounded-xl border border-(--border-color) transition-colors duration-200 ease-linear shadow-(--box-shadow)'>

      <span className='w-full text-(--color) font-medium text-lg my-3 transition-colors duration-200 ease-linear'>Current Weather</span>

      <div className="current-card w-full p-3 flex flex-col justify-center items-center rounded-xl bg-linear-to-br from-blue-500 to-blue-200">

        <div className="top w-full flex flex-row items-start justify-between">

          <span className="location flex flex-row items-center gap-1 text-sm">
            <svg width="18px" height="18px" fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.114-0.011c-6.559 0-12.114 5.587-12.114 12.204 0 6.93 6.439 14.017 10.77 18.998 0.017 0.020 0.717 0.797 1.579 0.797h0.076c0.863 0 1.558-0.777 1.575-0.797 4.064-4.672 10-12.377 10-18.998 0-6.618-4.333-12.204-11.886-12.204zM16.515 29.849c-0.035 0.035-0.086 0.074-0.131 0.107-0.046-0.032-0.096-0.072-0.133-0.107l-0.523-0.602c-4.106-4.71-9.729-11.161-9.729-17.055 0-5.532 4.632-10.205 10.114-10.205 6.829 0 9.886 5.125 9.886 10.205 0 4.474-3.192 10.416-9.485 17.657zM16.035 6.044c-3.313 0-6 2.686-6 6s2.687 6 6 6 6-2.687 6-6-2.686-6-6-6zM16.035 16.044c-2.206 0-4.046-1.838-4.046-4.044s1.794-4 4-4c2.207 0 4 1.794 4 4 0.001 2.206-1.747 4.044-3.954 4.044z"></path> </g></svg>
            {props.location.formatted}
          </span>

          <p className="date-time flex flex-col text-right text-sm">
            <span className="date">
              {getDateTime().dayName}, {getDateTime().date}
            </span>

            <span className="time">
              {getDateTime().time}
            </span>
          </p>

        </div>

        <div className='mid w-full flex flex-row items-center justify-start overflow-hidden h-20 relative'>
          <img className='w-30 h-30 absolute -left-2' src={weatherData.current.weather_icon} alt={weatherData.current.weather_icon} />
        </div>

        <div className="bottom flex flex-row justify-between w-full items-end">
          <div className="bototm-left flex flex-col">
            <span className='text-3xl font-semibold'>{weatherData.current.temperature}°C</span>
            <span className='text-sm'>{weatherData.current.weather_desc}</span>
          </div>

          <span className='flex flex-row items-center gap-2 text-sm'>
            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.25 5.5C6.25 3.70508 7.70507 2.25 9.5 2.25C11.2949 2.25 12.75 3.70507 12.75 5.5C12.75 7.29493 11.2949 8.75 9.5 8.75H3C2.58579 8.75 2.25 8.41421 2.25 8C2.25 7.58579 2.58579 7.25 3 7.25H9.5C10.4665 7.25 11.25 6.4665 11.25 5.5C11.25 4.5335 10.4665 3.75 9.5 3.75C8.5335 3.75 7.75 4.5335 7.75 5.5V5.85714C7.75 6.27136 7.41421 6.60714 7 6.60714C6.58579 6.60714 6.25 6.27136 6.25 5.85714V5.5ZM14.25 7.5C14.25 5.15279 16.1528 3.25 18.5 3.25C20.8472 3.25 22.75 5.15279 22.75 7.5C22.75 9.84721 20.8472 11.75 18.5 11.75H2C1.58579 11.75 1.25 11.4142 1.25 11C1.25 10.5858 1.58579 10.25 2 10.25H18.5C20.0188 10.25 21.25 9.01878 21.25 7.5C21.25 5.98122 20.0188 4.75 18.5 4.75C16.9812 4.75 15.75 5.98122 15.75 7.5V8C15.75 8.41421 15.4142 8.75 15 8.75C14.5858 8.75 14.25 8.41421 14.25 8V7.5ZM3.25 14C3.25 13.5858 3.58579 13.25 4 13.25H18.5C20.8472 13.25 22.75 15.1528 22.75 17.5C22.75 19.8472 20.8472 21.75 18.5 21.75C16.1528 21.75 14.25 19.8472 14.25 17.5V17C14.25 16.5858 14.5858 16.25 15 16.25C15.4142 16.25 15.75 16.5858 15.75 17V17.5C15.75 19.0188 16.9812 20.25 18.5 20.25C20.0188 20.25 21.25 19.0188 21.25 17.5C21.25 15.9812 20.0188 14.75 18.5 14.75H4C3.58579 14.75 3.25 14.4142 3.25 14Z" fill="white" />
            </svg>
            {degreesToDirection()}, {weatherData.current.wind_speed} Km/h
          </span>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeatherCard
