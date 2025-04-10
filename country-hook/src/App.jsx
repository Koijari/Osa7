import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// Custom hook
const useCountry = (name) => {
  //if (name) console.log(name)
  const [country, setCountry] = useState(null)

  //console.log(name, country)
  useEffect(() => {
    if (name) {
      const fetchCountry = async () => {
        try {
          const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
          setCountry({ found: true, data: response.data })
          //console.log(response.data)
        } catch (error) {
          setCountry({ found: false })
        }
      }
      fetchCountry()
    } else {
      setCountry(null)
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name.official} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img border='1px' src={country.data.flags.png} height='100' alt={`flag of ${country.data.name.common}`} />  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    if (nameInput.value.trim()) {
      setName(nameInput.value)
    }
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App