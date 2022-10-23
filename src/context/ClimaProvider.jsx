import { useState, createContext } from 'react'
import axios from 'axios'

const ClimaContext = createContext()

const ClimaProvider = ({ children }) => {
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: '',
  })

  const [resultado, setResultado] = useState({})
  const [loading, setLoading] = useState(false)
  const [noResultado, setNoResultado] = useState('')

  const consultarClima = async datos => {
    setNoResultado(false)
    setLoading(true)
    try {
      const { ciudad, pais } = datos
      const appId = import.meta.env.VITE_API_KEY

      const url = `${
        import.meta.env.VITE_API_URL
      }/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`

      const { data } = await axios(url)
      const { lat, lon } = data[0]
      const weatherURL = `${
        import.meta.env.VITE_API_WEATHER_URL
      }/weather?lat=${lat}&lon=${lon}&appid=${appId}`
      const { data: dataWeather } = await axios(weatherURL)
      setResultado(dataWeather)
    } catch (error) {
      console.log(error)
      setResultado({})
      setNoResultado('No hay resultados')
    } finally {
      setLoading(false)
    }
  }

  const datosBusqueda = e => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <ClimaContext.Provider
      value={{
        busqueda,
        datosBusqueda,
        consultarClima,
        resultado,
        loading,
        noResultado,
      }}
    >
      {children}
    </ClimaContext.Provider>
  )
}

export { ClimaProvider }
export default ClimaContext
