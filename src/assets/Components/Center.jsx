import React from 'react'
import WeatherCard from "./WeatherCard"

const Center = (props) => {
    const weatherData = props.weatherData

    return (
        <div className='p-4 overflow-y-auto'>
            {(!weatherData
                ? <p>Loading...</p>
                : <WeatherCard
                    weatherData={weatherData}
                    location={props.location}
                    weatherCodes={props.weatherCodes}
                />

                // Object.entries(weatherData).map(([key, value]) => (
                //     <p key={key}>
                //         {key}: {value}
                //     </p>
                // ))
            )}
        </div>
    )
}

export default Center
