import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capitalName}) => {
  const [weather, setWeather] = useState()

  useEffect(() => {
    const params = {
      q: capitalName[0],
      appid: process.env.REACT_APP_API_KEY
    }
    axios
      .get('https://api.openweathermap.org/data/2.5/weather', {params})
      .then(response => {
        const weatherData = response.data
        console.log(`Temp in ${weatherData.name} is ${weatherData.main.temp} K`);
        setWeather(weatherData)
      }).catch(error => {
        console.log(error);
      })
  }, [])

  if(weather !== undefined) {
    console.log(weather)

    return (
      <>
        <h2>Weather in {capitalName}</h2>
        <b>temperature:</b> {kelvinToCelcius(weather.main.temp)} °C
        <br></br>
        <img src={generateIconUrl(weather.weather[0].icon)} />
        <br></br>
        <b>wind:</b> {weather.wind.speed} m/s direction {weather.wind.deg} degrees
      </>
    )
  }

  return <p>loading weather..</p>

}

const generateIconUrl = (icon) => {
  const weatherIconUrl = 'http://openweathermap.org/img/wn/'
  const weatherIconFileEnding = '@2x.png'
  return weatherIconUrl.concat(icon, weatherIconFileEnding)
}

const kelvinToCelcius = (tempInKelvin) => {
  return (tempInKelvin - 273.15).toFixed(0)
}

export default Weather