import Formulario from './Formulario'
import Resultado from './Resultado'
import useClima from '../hooks/useClima'
import Loading from './Loading'

const AppClima = () => {
  const { resultado, loading, noResultado } = useClima()
  return (
    <>
      <main className='dos-columnas'>
        <Formulario />
        {loading ? (
          <Loading />
        ) : resultado?.name ? (
          <Resultado />
        ) : noResultado ? (
          <p>{noResultado}</p>
        ) : (
          <p>El Clima se va a mostrar aquí</p>
        )}
      </main>
    </>
  )
}

export default AppClima
