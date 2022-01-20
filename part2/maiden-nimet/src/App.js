import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'


const App = () => {
  const [countryFilter, setFilter] = useState('')
  const [countryList, setCountryList] = useState([])

  const handleFilter = (event) => {setFilter(event.target.value)}

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {setCountryList(response.data)})
  }, [])


  return (
  <div>
    <p>Find countries: <input onChange={handleFilter}/></p>
    <CountryList countries={countryList} countryFilter={countryFilter} />
  </div>
)}

export default App;
