import { useState, useEffect, useRef, useContext } from 'react'
import Header from './assets/Components/Header.jsx'
import Center from './assets/Components/Center.jsx'
import './App.css'

function App() {

  const [location, setLocation] = useState({name: "Bharuch, GJ, India", latitude: Number(21.7), longitude: Number(72.97)})
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    async function callApi() {
      try {
        let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&forecast_days=7&timezone=auto`)

        let result = await response.json()

        console.log(result)

        const data = {
          current: {
            location: location,
            temperature: result.current.temperature_2m,
            feels_like: result.current.apparent_temperature,
            humidity: result.current.relative_humidity_2m,
            pressure: result.current.pressure_msl,
            cloud_cover: result.current.cloud_cover,
            wind_speed: result.current.wind_speed_10m,
            wind_direction: result.current.wind_direction_10m,
            weather_code: result.current.weather_code
          },

          today: {
            sunrise: result.daily.sunrise[0],
            sunset: result.daily.sunset[0],
            uv_index: result.daily.uv_index_max[0],
            rain_chance: result.daily.precipitation_probability_max[0]
          },

          hourly: result.hourly.time.map((time, index) => ({
            time,
            temperature: result.hourly.temperature_2m[index],
            weather_code: result.hourly.weather_code[index],
            rain_chance: result.hourly.precipitation_probability[index]
          })),

          weekly: result.daily.time.map((date, index) => ({
            date,
            weather_code: result.daily.weather_code[index],
            temp_max: result.daily.temperature_2m_max[index],
            temp_min: result.daily.temperature_2m_min[index],
            sunrise: result.daily.sunrise[index],
            sunset: result.daily.sunset[index],
            uv_index: result.daily.uv_index_max[index],
            rain_chance: result.daily.precipitation_probability_max[index],
            wind_speed: result.daily.wind_speed_10m_max[index],
            wind_direction: result.daily.wind_direction_10m_dominant[index]
          }))
        }
        setWeatherData(data)
      }
      catch (err) {
        console.log(err)
      }
    }

    callApi()
  }, [location])

  useEffect(() => {
    console.log(weatherData)
  }, [weatherData])



  return (
    <>
      <Header
        weatherData={weatherData}
        location={location}
        setLocation={setLocation}
      />

      <Center
        weatherData={weatherData}
        location={location}
      />
    </>
  )
}

export default App
