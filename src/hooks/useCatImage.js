import { useEffect, useState } from 'react'
export function useCatImage ({ fact }) {
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
