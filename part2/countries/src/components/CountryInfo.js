import React from 'react'
import Weather from './Weather'

const CountryInfo = ({ name, capital, population, languages, flagUrl }) => {
  const languageNames = extractObjectValueWithoutKey(languages)

  return (
    <div>
      <h1>{name}</h1>
      <p>
        capital {capital}
        <br></br>
        population {population}
      </p>
      <h2>laguages</h2>
      <ul>
        {languageNames
          .map(language =>
            <li key={language}>
              {language}
            </li>
          )}
      </ul>
      <img src={flagUrl}/>
      <Weather capitalName={capital} />
    </div>
  )
}

const extractObjectValueWithoutKey = (objects) => {
  const objectValues = []
  for (var propName in objects) {
    if (objects.hasOwnProperty(propName)) {
      objectValues.push(objects[propName])
    }
  }
  console.log(objectValues)
  return objectValues
}

/*

NOTE: i had to create a help function to extract the language 
values from a list of language objects without knowing their keys

EXAMPLE:
languages: {
  fra: "French",
  gsw: "Swiss German",
  ita: "Italian",
  roh: "Romansh"
}

*/

export default CountryInfo