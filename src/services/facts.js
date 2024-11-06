const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

export const getRandomFact = async () => {
  const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
  const data = await res.json()
  const { fact } = data
  /*
  //testeando el error de carga de una imagen comentar linea superior
  const fact = 'el 70% da cosas que pasan' */
  return fact
}
