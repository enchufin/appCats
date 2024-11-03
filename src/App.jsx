import { useState, useEffect } from 'react'
import './styles.css'
const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWords}?fontSize=24&fontColor=white&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/'

export default function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()
  const [imageTag, setImageTag] = useState()
  const [error, setError] = useState(null)

  const getRandomFact = async () => {
    try {
      const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
      const data = await res.json()
      setFact(data.fact)
    } catch (error) {
      console.error('Error fetching cat fact:', error)
      setError('Ha fallado el fetch al dato. Please try again.')
    }
  }

  // recogemos el fact al cargar imagen
  useEffect(() => { getRandomFact() }, [])

  // cada vez que cambia el fact recogemos una imagen
  useEffect(() => {
    if (!fact) return

    const firstWords = fact.split(' ', 3).join(' ')
    /*  console.log(firstWords) */
    fetch(`https://cataas.com/cat/says/${firstWords}?fontSize=30&fontColor=white&json=true`)
      .then(res => res.json())
      .then(response => {
        const idImage = response._id
        setImageTag(response.tags)
        setImageUrl(`${idImage}/says/${firstWords}?fontSize=30&fontColor=white`)
      })
  }, [fact])

  // maneja el click con una constante
  const handleClick = () => {
    getRandomFact()
  }

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}> Obtener otra curiosidad </button>
      <section>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`imagen random de gatitos con los tags: ${imageTag}`} />}
      </section>
    </main>
  )
}
