import { useEffect, useReducer } from "react"
import { AutocompleteState } from "../store"
import { AutocompleteAction } from "../store/actions"
import useApi from "../store/api"
import { autocompleteReducer } from "../store/reducer"

const useAutocompleteCollection = (): [AutocompleteState, React.Dispatch<AutocompleteAction>] => {
  const { fetchData } = useApi()

  const [state, dispatch] = useReducer(autocompleteReducer, {
    registers: [],
    cachedRegisters: [],
    isLoading: true,
    searchTerm: {
      term: ''
    }
  })

  const cacheRegisters = async () => {
    await fetchData({ term: '*' })

    dispatch({
      type: 'setStateProp',
      payload: {
        isLoading: false
      }
    })
  }

  useEffect(() => {
    cacheRegisters()
  }, [])

  return [state, dispatch]
}

export default useAutocompleteCollection