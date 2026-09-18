import React, { useState } from 'react'
import { useWeather } from '../../context/WeatherContext'

const HourlyForecast = (props) => {
    const { weatherData } = useWeather();

    const isDayTime = (time, sunrise, sunset) => {

        const now = new Date(time);

        const sunriseTime = new Date(sunrise);

        const sunsetTime = new Date(sunset);

        return now >= sunriseTime &&
            now <= sunsetTime;
    };




    return (
        <div className='flex-1 h-fit bg-(--surface-color1) rounded-2xl border border-(--border-color) shadow-(--box-shadow) p-3 transition-colors duration-200 ease-linear flex flex-col items-center overflow-hidden'>

            <span className='w-full text-(--color) font-medium text-lg mb-3 transition-colors duration-200 ease-linear'>
                Upcoming Weather
            </span>

            <div className='w-full overflow-x-auto rounded-xl scrollbar-none'>
                <ul className='flex flex-row gap-2 h-fit items-center transiiton-colors duration-200 ease-linear'>
                    {weatherData.hourly.slice(0, 23).map((item, index) => {
                        const day = isDayTime(item.time, weatherData.today.sunrise, weatherData.today.sunset)

                        return <li
                            className='w-30 flex-none rounded-xl p-2 bg-(--surface-color2) relative flex flex-col items-center justify-center transition-colors duration-200 ease-linear'
                            key={item.time}
                        >
                            <img
                                className='w-12 h-12 my-3'
                                src={day
                                    ? (props.weatherCodes[item.weather_code].dayIcon ?? props.weatherCodes[item.weather_code].icon)
                                    : (props.weatherCodes[item.weather_code].nightIcon ?? props.weatherCodes[item.weather_code].icon)
                                }
                                alt={props.weatherCodes[item.weather_code].weather}
                            />

                            <span className='text-xs text-nowrap font-medium text-(--muted-text-color)'>
                                {props.weatherCodes[item.weather_code].weather}
                            </span>

                            <span className='font-semibold text-3xl mb-3'>
                                {Math.round(item.temperature)}°C
                            </span>

                            <span className='text-sm text-(--muted-text-color) text-center font-medium'>
                                {new Date(item.time).toLocaleTimeString("en-US",
                                    {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true
                                    }
                                )}
                            </span>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default HourlyForecast
