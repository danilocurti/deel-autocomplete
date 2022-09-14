import React, { createContext } from "react"
import { AutocompleteState } from "."
import useAutocompleteCollection from "../hooks/useAutocompleteCollection"
import { AutocompleteAction } from "./actions"

type AutocompleteContextType = AutocompleteState & {
  autocompleteDispatch: React.Dispatch<AutocompleteAction>
}

export const AutocompleteContext = createContext<AutocompleteContextType | undefined>(undefined)

export const AutocompleteProvider = ({ children }: any) => {
  const [state, autocompleteDispatch] = useAutocompleteCollection()

  const providerValue = {
    ...state,
    autocompleteDispatch,
  }

  return (
      <AutocompleteContext.Provider value={providerValue}>
          {children}
      </AutocompleteContext.Provider>
  )
}