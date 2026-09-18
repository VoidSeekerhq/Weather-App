import React from 'react'
import WeatherCard from "./WeatherCard"
import HourlyForecast from "./HourlyForecast"
import { useWeather } from '../../context/WeatherContext'

const Center = (props) => {
    const { weatherData } = useWeather();

    const isDayTime = (sunrise, sunset) => {

        const now = new Date();

        const sunriseTime = new Date(sunrise);

        const sunsetTime = new Date(sunset);

        return now >= sunriseTime &&
            now <= sunsetTime;
    };

    return (
        <div className='p-4 overflow-y-auto flex flex-row gap-3'>
            {(!weatherData
                ? <p>Loading...</p>
                : <>
                    <WeatherCard
                        location={props.location}
                        weatherCodes={props.weatherCodes}
                        isDayTime={isDayTime}
                        />
                    <HourlyForecast
                        weatherCodes={props.weatherCodes}
                    />
                </>
            )}
        </div>
    )
}

export default Center
