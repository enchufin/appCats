import { useState, useEffect } from 'react'
import { getRandomFact } from './services/facts.js'
import './styles.css'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/'

function useCatImage ({ fact }) {
  /* const [imageUrl, setImageUrl] = useState()
  const [imageTag, setImageTag] = useState()
  const [error, setError] = useState(null)
  */
  const [catImage, setCatImage] = useState({
    imageUrl: '',
    imageTag: '',
    imageError: null,
    imageLoading: true
  })

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
        setCatImage({
          imageTag: response.tags,
          imageUrl: `${idImage}/says/${firstWords}?fontSize=30&fontColor=white`,
          imageError: null,
          imageLoading: false
        })
      })
      .catch(error => {
        console.error('Error fuente de gatitos:', error)
        setCatImage(prevState => ({
          ...prevState,
          imageError: 'Error al cargar la foto. Please try again.',
          imageLoading: false
        }))
      })
  }, [fact])

  // devolvemos el objeto catImage y el posible error
  return { catImage, error: catImage.imageError }
}

export default function App () {
  const [fact, setFact] = useState()
  const [factError, setFactError] = useState(null)
  const { catImage, error: imageError } = useCatImage({ fact })
  const [isLoading, setIsLoading] = useState(false)

  // recogemos el fact al cargar imagen
  useEffect(() => {
    setIsLoading(true)
    setFactError(null)
    getRandomFact().then(newFact => {
      setFact(newFact)
      setIsLoading(false)
    })
  }, [])

  // maneja el click con una constante
  const handleClick = () => {
    setIsLoading(true)
    setFactError(null)
    getRandomFact()
      .then(newFact => {
        // si se recibe un fact nuevo
        if (!newFact) throw new Error('No se pudo obtener un nuevo dato curioso')
        setFact(newFact)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error:', error)
        setFactError('Error al cargar el dato curioso')
        setIsLoading(false)
      })
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
          disabled={isLoading || catImage.imageLoading}
        >
          {isLoading || catImage.imageLoading ? 'Cargando...' : 'Obtener otra curiosidad'}
        </button>
        {/* {error && <p className='mensaje-error'>{error}</p>} */}
        <div
          className={`mensaje-error ${factError || imageError ? '' : 'oculto'}`}
          role='alert'
        >
          {factError || imageError}
        </div>
        <article>
          {fact && <p>{fact}</p>}
          {catImage.imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${catImage.imageUrl}`} alt={`imagen random de gatitos con los tags: ${catImage.imageTag}`} />}
        </article>
      </section>
    </main>
  )
}
