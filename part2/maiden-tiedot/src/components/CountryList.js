import React, {useEffect, useState} from "react"
import axios from 'axios'

const Weather = ({weather}) => {
  if (weather.length<1) {
    return <div></div>
  }
  return <div>
    <div>Description: {weather.weather[0].description}</div>
    <div>Temperature: {weather.main.temp} °C</div>
    <div>Wind: {weather.wind.speed}</div>
  </div>
}

const CountryInfo = ({country}) => {
  const languages = Object.entries(country.languages)
  const [weather, setWeather] = useState('')
  const api_key = process.env.REACT_APP_API_KEY
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}&units=metric`)
      .then(response => {setWeather(response.data)})
  }, [])
  return <div>
    <h1>{country.name.common}</h1>
    <div>Capital: {country.capital[0]}</div>
    <div>Other names: {country.altSpellings[0]}{country.altSpellings.slice(1).map(name => <span key={name}>, {name}</span>)}</div>
    <div>Languages: {languages[0][1]}{languages.slice(1).map(([key, val])=> <span key={key}>, {val}</span>)}</div>
    <br/>
    <img src={country.flags.png} alt={`Flag of ${country.name.common}`}></img>
    <br />
    <h2>Weather in {country.capital[0]}</h2>
    <Weather weather={weather} />
  </div>
}

const CountryList = (props) => {
  if (props.countryFilter.length<1) {
    return <div></div>
  }

  const matchingCountries = props.countries.filter(country => country.name.common.toLowerCase().includes(props.countryFilter.toLowerCase()))

  if (matchingCountries.length<1) {
    return <div>No matches!</div>
  }

  if (matchingCountries.length<2) {
    return <CountryInfo country={matchingCountries[0]}/>
  }

  return matchingCountries.length > 10
  ?  <div>Too many matches, specify another filter</div>
  : <div>{matchingCountries.map(country => <div key={country.name.common}>{country.name.common} <button onClick={() => props.setFilter(country.name.common)}>Show</button></div>)}</div>
}

export default CountryList