import { useState, useEffect } from 'react'
import './styles.css'
const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWords}?fontSize=24&fontColor=white&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/'

export default function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()
  const [imageTag, setImageTag] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const getRandomFact = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
      const data = await res.json()
      setFact(data.fact)
    } catch (error) {
      console.error('Error fetching cat fact:', error)
      setError('Ha fallado el fetch al dato. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // recogemos el fact al cargar imagen
  useEffect(() => { getRandomFact() }, [])

  // cada vez que cambia el fact recogemos una imagen
  useEffect(() => {
    if (!fact) return

    const firstWords = fact.split(' ', 3).join(' ')
    /*  console.log(firstWords) */
    fetch(`https://cataas.com/cat/says/${firstWords}?fontSize=60&fontColor=white&json=true`)
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar la foto')
        return res.json()
      })
      .then(response => {
        const idImage = response._id
        setImageTag(response.tags)
        setImageUrl(`${idImage}/says/${firstWords}?fontSize=30&fontColor=white`)
      })
      .catch(error => {
        console.error('Error fuente de gatitos:', error)
        setError('Error al cargar la foto. Please try again.')
      })
  }, [fact])

  // maneja el click con una constante
  const handleClick = () => {
    getRandomFact()
  }

  return (
    <main>
      <h1>App de gatitos</h1>
      <section>
        <button
          className='button'
          onClick={handleClick}
          /* previene  múltiples solicitudes y
          deshabilita el botón mientras se carga */
          disabled={isLoading}
        >
          {isLoading ? 'Cargando...' : 'Obtener otra curiosidad'}
        </button>
        {/* {error && <p className='mensaje-error'>{error}</p>} */}
        <div
          className={`mensaje-error ${error ? '' : 'oculto'}`}
          role='alert'
        >
          {error}
        </div>
        <article>
          {fact && <p>{fact}</p>}
          {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`imagen random de gatitos con los tags: ${imageTag}`} />}
        </article>
      </section>
    </main>
  )
}
