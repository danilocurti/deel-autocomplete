import { useState } from "react"
import { Pokemon } from "../types/Pokemon"
import { SearchTerm } from "../types/SearchTerm"

interface ApiResponse {
  results: Pokemon[]
}

const useApi = () => {
  const [cachedData, setCachedData] = useState<Pokemon[]>()

  const API_PREFIX = 'https://pokeapi.co/api/v2/pokemon/'
  const IMAGE_URL_PREFIX = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

  const getId = ({ url }: Pokemon) => url.replace(API_PREFIX, '').replace('/', '')

  const getImageUrl = (id: Pokemon['id']) => `${IMAGE_URL_PREFIX}${id}.png`

  const formatAndFilterResults = (results: Pokemon[], searchTerm: SearchTerm): Pokemon[] => {
    const formatedResults = results.map(
      item => {
        const id = getId(item)
        const imageUrl = getImageUrl(id)

        return {
          ...item,
          id: id.padStart(5, '0'),
          imageUrl,
        }
      }
    )

    const filteredResults = formatedResults.filter((item) => {
      const { term, exactSearch } = searchTerm
      if (!!exactSearch) {
        return item.name === term || item.id === term
      }

      return item.name.includes(term) || item.id.includes(term)
    })

    return filteredResults.slice(0, 100)
  }

  const fetchData = async (searchTerm: SearchTerm) => {
    if (!searchTerm.term) {
      return []
    }

    if (!!cachedData) {
      return formatAndFilterResults(cachedData, searchTerm)
    }
    
    // This API does not provide a search by name, so I retrieve all results and filter on the client side.
    // I'd NEVER use this approach in the real world, it's just because I want to list pokémons in this test :)
    const request = await fetch(`${API_PREFIX}?limit=2000&offset=0`)
    const { results }: ApiResponse = await request.json()
    setCachedData(results)
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    
    return formatAndFilterResults(results, searchTerm)
  }

  return {
    fetchData
  }
}

export default useApi