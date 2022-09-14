import { useContext } from "react"
import { FocusSearchOccurrence, SetStateProp } from "../store/actions"
import useApi from "../store/api"
import { AutocompleteContext } from "../store/AutocompleteProvider"
import { SearchTerm } from "../types/SearchTerm"

const useAutocompleteContext = () => {
  const { fetchData } = useApi()
  const context = useContext(AutocompleteContext)!
  if (context) {
    const { autocompleteDispatch } = context
  
    const setSearchTerm = async (searchTerm: SearchTerm) => {
      const registers = await fetchData(searchTerm)

      autocompleteDispatch({
        type: 'setSearchTerm',
        payload: {
          searchTerm,
          registers,
        }
      })
    }
  
    const setStateProp = (payload: SetStateProp['payload']) => autocompleteDispatch({
      type: 'setStateProp',
      payload
    })
  
    const cancelSearch = () => autocompleteDispatch({
      type: 'cancelSearch'
    })

    const focusSearchField = () => autocompleteDispatch({
      type: 'focusSearchField'
    })

    const selectSearchField = () => autocompleteDispatch({
      type: 'selectSearchField'
    })
  
    const focusSearchOccurrence = (payload?: FocusSearchOccurrence['payload']) => autocompleteDispatch({
      type: 'focusSearchOccurrence',
      payload
    })
  
    const selectFocusedSearchOccurrence = () => autocompleteDispatch({
      type: 'selectFocusedSearchOccurrence'
    })
  
    return {
      ...context,
      setStateProp,
      setSearchTerm,
      cancelSearch,
      focusSearchField,
      selectSearchField,
      focusSearchOccurrence,
      selectFocusedSearchOccurrence
    }
  }

  return context
}

export default useAutocompleteContext