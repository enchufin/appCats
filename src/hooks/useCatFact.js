import { useState, useEffect } from 'react'
import { getRandomFact } from '../services/facts.js'

export function useCatFact () {
  const [fact, setFact] = useState()
  const [factError, setFactError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const refreshRandomFact = () => {
    setIsLoading(true)
    setFactError(null)
    getRandomFact().then(newFact => {
      if (!newFact) throw new Error('No se pudo obtener un nuevo dato curioso')
      setFact(newFact)
    }).catch(error => {
      console.error('Error:', error)
      setFactError('Error al cargar el dato curioso')
    })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // recogemos el fact al cargar imagen
  useEffect(() => {
    refreshRandomFact()
  }, [])
  return { fact, refreshRandomFact, factError, isLoading }
}
