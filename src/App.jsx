import { useState, useEffect } from 'react'
const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWords}?fontSize=24&fontColor=white&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/'

export default function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then((data) => {
        const { fact } = data
        setFact(fact)

        const firstWords = fact.split(' ', 3).join(' ')
        console.log(firstWords)

        fetch(`https://cataas.com/cat/says/${firstWords}?fontSize=30&fontColor=white&json=true`)
          .then(res => res.json())
          .then(response => {
            const idImage = response._id
            setImageUrl(`${idImage}/says/${firstWords}?fontSize=30&fontColor=white`)
          })
      })
  }, [])

  return (
    <>
      <h1>App de gatitos</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} />}

    </>
  )
}
