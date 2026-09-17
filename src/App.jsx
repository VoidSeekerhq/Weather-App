import { useState, useEffect, useRef, useContext } from 'react'
import Header from './assets/Components/Header.jsx'
import Center from './assets/Components/Center.jsx'
import './App.css'
import { getIcon } from './utils/WeatherIcons.js'

function App() {

  const [location, setLocation] = useState({ formatted: "Bharuch, GJ, India", latitude: Number(21.7), longitude: Number(72.97) })
  const [weatherData, setWeatherData] = useState(null)
  const [theme, setTheme] = useState("light")

  const weatherCodes = {

  // Clear
  0: {
    weather: "Clear Sky",
    icon: getIcon("day_clear")
  },

  // Partly Cloudy
  1: {
    weather: "Mainly Clear",
    icon: getIcon("day_partial_cloud")
  },

  2: {
    weather: "Partly Cloudy",
    icon: getIcon("day_partial_cloud")
  },

  // Overcast
  3: {
    weather: "Overcast",
    icon: getIcon("overcast")
  },

  // Fog
  45: {
    weather: "Fog",
    icon: getIcon("fog")
  },

  48: {
    weather: "Depositing Rime Fog",
    icon: getIcon("mist")
  },

  // Drizzle
  51: {
    weather: "Light Drizzle",
    icon: getIcon("day_rain")
  },

  53: {
    weather: "Moderate Drizzle",
    icon: getIcon("day_rain")
  },

  55: {
    weather: "Dense Drizzle",
    icon: getIcon("rain")
  },

  // Freezing Drizzle
  56: {
    weather: "Light Freezing Drizzle",
    icon: getIcon("sleet")
  },

  57: {
    weather: "Dense Freezing Drizzle",
    icon: getIcon("sleet")
  },

  // Rain
  61: {
    weather: "Slight Rain",
    icon: getIcon("day_rain")
  },

  63: {
    weather: "Moderate Rain",
    icon: getIcon("rain")
  },

  65: {
    weather: "Heavy Rain",
    icon: getIcon("angry_clouds")
  },

  // Freezing Rain
  66: {
    weather: "Light Freezing Rain",
    icon: getIcon("sleet")
  },

  67: {
    weather: "Heavy Freezing Rain",
    icon: getIcon("sleet")
  },

  // Snow
  71: {
    weather: "Slight Snowfall",
    icon: getIcon("day_snow")
  },

  73: {
    weather: "Moderate Snowfall",
    icon: getIcon("snow")
  },

  75: {
    weather: "Heavy Snowfall",
    icon: getIcon("snow")
  },

  77: {
    weather: "Snow Grains",
    icon: getIcon("snow")
  },

  // Rain Showers
  80: {
    weather: "Slight Rain Showers",
    icon: getIcon("day_rain")
  },

  81: {
    weather: "Moderate Rain Showers",
    icon: getIcon("rain")
  },

  82: {
    weather: "Violent Rain Showers",
    icon: getIcon("angry_clouds")
  },

  // Snow Showers
  85: {
    weather: "Slight Snow Showers",
    icon: getIcon("day_snow")
  },

  86: {
    weather: "Heavy Snow Showers",
    icon: getIcon("snow")
  },

  // Thunderstorm
  95: {
    weather: "Thunderstorm",
    icon: getIcon("thunder")
  },

  96: {
    weather: "Thunderstorm With Hail",
    icon: getIcon("rain_thunder")
  },

  99: {
    weather: "Thunderstorm With Heavy Hail",
    icon: getIcon("rain_thunder")
  }

};



  useEffect(() => {
    async function callApi() {
      try {
        let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&forecast_days=7&timezone=auto`)

        // let response2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_KEY}`)

        let result = await response.json()
        // let result2 = await response2.json()

        console.log(result)
        // console.log("result2", result2)

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
            weather_code: result.current.weather_code,
            // weather: result2.weather[0].main,
            // weather_icon: result2.weather[0].icon,
            // weather_icon: `https://openweathermap.org/img/wn/${result2.weather[0].icon}@4x.png`,
            // weather_desc: result2.weather[0].description
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
    console.log("weather Data", weatherData)
  }, [weatherData])



  return (
    <>
      <Header
        weatherData={weatherData}
        location={location}
        setLocation={setLocation}
        theme={theme}
        setTheme={setTheme}
      />

      <Center
        weatherData={weatherData}
        location={location}
        weatherCodes={weatherCodes}
      />
    </>

  )
}

export default App
