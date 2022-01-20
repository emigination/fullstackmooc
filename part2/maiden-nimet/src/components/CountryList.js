import React from "react"

const CountryInfo = ({country}) => {
  const languages = Object.entries(country.languages)
  return <div>
    <h1>{country.name.common}</h1>
    <div>Capital: {country.capital[0]}</div>
    <div>Other names: {country.altSpellings[0]}{country.altSpellings.slice(1).map(name => <span key={name}>, {name}</span>)}</div>
    <div>Languages: {languages[0][1]}{languages.slice(1).map(([key, val])=> <span key={key}>, {val}</span>)}</div>
    <br/>
    <img src={country.flags.png} alt={`Flag of ${country.name.common}`}></img>
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
  : <div>{matchingCountries.map(country => <div key={country.name.common}>{country.name.common}</div>)}</div>
}

export default CountryList