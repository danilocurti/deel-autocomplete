import { SearchFieldRef } from "../components/Autocomplete/SearchField"
import { SearchOccurrencesRef } from "../components/Autocomplete/SearchOccurrences"
import { Pokemon } from "../types/Pokemon"
import { SearchTerm } from "../types/SearchTerm"

export interface AutocompleteState {
  isLoading: boolean
  registers: Pokemon[]
  cachedRegisters: Pokemon[]
  searchTerm: SearchTerm
  searchFieldRef?: React.RefObject<SearchFieldRef>
  searchOccurrencesRef?: React.RefObject<SearchOccurrencesRef>
}