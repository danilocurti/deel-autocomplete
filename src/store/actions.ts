import { AutocompleteState } from "."

export interface SetSearchTerm {
  type: 'setSearchTerm',
  payload: Pick<AutocompleteState, 'searchTerm' | 'registers'>
}

export interface SetStateProp {
  type: 'setStateProp',
  payload: Partial<Omit<AutocompleteState, 'searchTerm'>>
}

export interface CancelSearch {
  type: 'cancelSearch'
}

export interface FocusSearchField {
  type: 'focusSearchField'
}

export interface SelectSearchField {
  type: 'selectSearchField'
}

export interface FocusSearchOccurrence {
  type: 'focusSearchOccurrence'
  payload?: {
    toPreviousSibling?: boolean
  }
}

export interface SelectFocusedSearchOccurrence {
  type: 'selectFocusedSearchOccurrence'
}

export type AutocompleteAction = SetStateProp
  | SetSearchTerm
  | CancelSearch
  | FocusSearchField
  | SelectSearchField
  | FocusSearchOccurrence
  | SelectFocusedSearchOccurrence