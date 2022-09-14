import { AutocompleteState } from "."
import { AutocompleteAction } from "./actions"

export const autocompleteReducer = (state: AutocompleteState, action: AutocompleteAction): AutocompleteState => {
  switch (action.type) {
    case 'setSearchTerm':
    case 'setStateProp':
      return {
        ...state,
        ...action.payload,
      }
    case 'cancelSearch':
      state.searchFieldRef?.current?.cancelSearch()
      return state
    case 'focusSearchField':
      state.searchFieldRef?.current?.focus()
      return state
    case 'selectSearchField':
      state.searchFieldRef?.current?.select()
      return state
    case 'focusSearchOccurrence':
      state.searchOccurrencesRef?.current?.focus(action.payload?.toPreviousSibling)
      return state
    case 'selectFocusedSearchOccurrence':
      state.searchOccurrencesRef?.current?.selectFocused()
      return state
    default:
      return state
  }
}