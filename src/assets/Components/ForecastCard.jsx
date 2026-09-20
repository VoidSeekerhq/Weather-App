import React, { useEffect, useState } from 'react'
import { useWeather } from '../../context/WeatherContext'


const ForecastCard = (props) => {
    const { weatherData } = useWeather()

    const getDayName = (dateString) => {
        const date = new Date(dateString);

        return date.toLocaleDateString("en-US", {
            weekday: "long"
        });

    };

    const getWeekRange = () => {
        const weekMin = Math.min(...props.weekly.map(day => day.temp_min));
        const weekMax = Math.max(...props.weekly.map(day => day.temp_max));

        return { weekMin, weekMax };
    };

    const getTempBar = (day) => {

        const { weekMin, weekMax } = getWeekRange();

        const totalRange = (1, weekMax - weekMin);

        const left =
            ((day.temp_min - weekMin) / totalRange) * 100;

        const width =
            ((day.temp_max - day.temp_min) / totalRange) * 100;

        return {
            left: `${left}%`,
            width: `${width}%`
        };
    };

    return (
        <>
                    <span className='w-full text-(--color) font-medium text-lg my-3 transition-colors duration-200 ease-linear'>Weekly Forecast</span>

                    {/* <nav className='w-full transition-colors duration-200 ease-linear bg-(--bg2) p-1 flex flex-row justify-around items-center rounded-full'>
                        <div className="weekly-pill bg-(--surface-color1) py-2 rounded-full border-(--border-color) w-full text-center transition-colors duration-200 ease-linear cursor-pointer shadow-(--box-shadow)">
                            <span className='text-(--color) transition-colors duration-200 ease-linear'>Weekly</span>
                        </div>

                        <div className="monthly-pill w-full text-center transition-colors duration-200 ease-linear cursor-pointer">
                            <span className='text-(--muted-text-color) transition-colors duration-200 ease-linear'>Monthly</span>
                        </div>
                    </nav> */}

                    <ul className='text-sm w-full h-full flex flex-col transition-colors duration-200 ease-linear font-normal gap-5 my-2 mb-2'>

                        {props.weekly.map((item) => {
                            const bar = getTempBar(item);

                            return (
                                <li className='w-full grid grid-cols-[80px_auto_40px_1fr_40px] items-center justify-between transition-colors duration-200 ease-linear' key={getDayName(item.date)}>
                                    <span className='text-(--color) transition-colors duration-200 ease-linear'>{getDayName(item.date)}</span>

                                    <img className='w-6 h-6' src={props.weatherCodes[item.weather_code].icon} alt={props.weatherCodes[item.weather_code].weather} />

                                    <span className='text-(--color) text-center transition-colors duration-200 ease-linear'>{Math.round(item.temp_min)}°</span>

                                    <div className="bar bg-(--bg2) w-full h-1 rounded-full relative transition-colors duration-200 ease-linear">
                                        <div className="bar-thumb bg-(--thumb) w-5/6 h-full rounded-full relative transition-all duration-200 ease-linear"
                                            style={{
                                                left: bar.left,
                                                width: bar.width
                                            }}
                                        >
                                        </div>
                                    </div>

                                    <span className='text-(--color) text-center transition-colors duration-200 ease-linear'>{Math.round(item.temp_max)}°</span>
                                </li>
                            )
                        })}

                    </ul>
                </>
    )
}

export default ForecastCard
