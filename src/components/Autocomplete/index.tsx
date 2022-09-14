import './styles.scss'
import { useEffect, useRef } from "react"
import { AutocompleteProvider } from "../../store/AutocompleteProvider"
import SearchField, { SearchFieldRef } from "./SearchField"
import SearchOccurrences, { SearchOccurrencesRef } from "./SearchOccurrences"
import useAutocompleteContext from '../../hooks/useAutocompleteContext'

interface AutocompleteProps {}

const Autocomplete = ({}: AutocompleteProps) => {
  const { setStateProp } = useAutocompleteContext()

  const searchFieldRef = useRef<SearchFieldRef>(null)
  const searchOccurrencesRef = useRef<SearchOccurrencesRef>(null)

  const sendRefs = () => setStateProp({
    searchFieldRef,
    searchOccurrencesRef
  })
  
  useEffect(() => {
    sendRefs()
  }, [])

  return (
    <div className="autocomplete_container">
      <SearchField ref={searchFieldRef} />
      <SearchOccurrences ref={searchOccurrencesRef} />
    </div>
  )
}

export default () => (
  <AutocompleteProvider>
    <Autocomplete />
  </AutocompleteProvider>
)