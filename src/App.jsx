/* import { useState, useEffect } from 'react'
import { getRandomFact } from './services/facts.js' */
import './styles.css'
// importo mis custom hooks
import { useCatFact } from './hooks/useCatFact.js'
import { useCatImage } from './hooks/useCatImage.js'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/'

export default function App () {
  const { fact, refreshRandomFact, factError, isLoading } = useCatFact()
  const { catImage, error: imageError } = useCatImage({ fact })

  /* // ya no es necesario el handleClick porque recupero el refresh directamente del hook
  const handleClick = () => {
    refreshRandomFact()
  } */
  return (
    <main>
      <h1>App de gatitos</h1>
      <section>
        <button
          className='button'
          /* onClick={handleClick} ya no es necesario */
          onClick={refreshRandomFact}
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
