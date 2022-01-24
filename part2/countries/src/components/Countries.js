import React, { useState } from "react"
import CountryInfo from './CountryInfo'
import Country from './Country'


const Countries = ({ search, countries}) => {
  const [viewCountry, setViewContry] = useState([])
  const filteredList = filterCountries(search, countries)

  const handleViewClick = (event) => {
    console.log(event.target.value)
    const c = filterCountries(event.target.value, filteredList)
    console.log('country:', c)
    setViewContry(c[0])
  }

  const hanldeHideClick = () => {
    console.log('reset viewCountry')
    setViewContry([])
  }


  // if more than 10 matching countries:
  if (filteredList.length > 10) {
    return <p>to many matches, secify another filter</p>
  }

  // if button has been clicked to view a country:
  if (viewCountry.length !== 0) {
    return (
      <>
      <CountryInfo
        key={viewCountry.name.common}
        name={viewCountry.name.common}
        capital={viewCountry.capital}
        population={viewCountry.population}
        languages={viewCountry.languages}
        flagUrl={viewCountry.flags.png}
      />
        <button value={[]} onClick={hanldeHideClick}>
          Close
        </button>
      </>
    )
  }

  // if ten or less but higher than one matching country:
  if (filteredList.length <= 10 && filteredList.length > 1) {
    return (
      <table>
        <tbody>
          {filteredList
            .map(c => 
              <Country 
                key={c.ccn3} 
                name={c.name.common} 
                onClick={handleViewClick}
              />
            )}
        </tbody>
      </table>
    )
  }

  // default(one matching country):
  return (
    <>
      {filteredList
        .map(c => (
            <CountryInfo
              key={c.cca2}
              name={c.name.common}
              capital={c.capital}
              population={c.population}
              languages={c.languages}
              flagUrl={c.flags.png}
            />
        ))}
    </>         
  )
}


// Default(no input in search): returns an empty array.
// If search input: returns an array with matching countries if any.
const filterCountries = (search, countries) => {
  if (search !== '') {
    return (countries.filter(country =>
      country.name.common.toLowerCase().indexOf(search.toLowerCase()) > -1))
  } else {
    return []
  }
}

export default Countries