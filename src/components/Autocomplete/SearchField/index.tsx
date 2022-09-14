import './styles.scss'
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import closeIcon from "../../../assets/img/close.png"
import useApi from "../../../store/api"
import useAutocompleteContext from '../../../hooks/useAutocompleteContext'

interface SearchFieldProps {}

export interface SearchFieldRef {
  focus: () => void
  select: () => void
  cancelSearch: () => void
}

const SearchField = forwardRef<SearchFieldRef, SearchFieldProps>(({}, ref) => {
  const {
    isLoading,
    searchTerm,
    setSearchTerm,
    focusSearchOccurrence,
    selectFocusedSearchOccurrence,
  } = useAutocompleteContext()

  const inputRef = useRef<HTMLInputElement>(null)

  const updateSearchTerm = async (term: string) => {
    setSearchTerm({
      term
    })
  }

  const handleOnChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchTerm(value.toLowerCase())
  }

  const handleOnClear = () => {
    updateSearchTerm('')
    inputRef.current?.focus()
  }

  const focus = () => inputRef.current?.focus()

  const select = () => inputRef.current?.select()

  useEffect(() => {
    const input = inputRef.current

    const handleOnKeydown = (event: KeyboardEvent) => {
      const { key } = event
      const eventsMap: {[key: string]: () => void} = {
        Enter: () => {
          focusSearchOccurrence()
          selectFocusedSearchOccurrence()
        },
        Escape: () => handleOnClear(),
        ArrowDown: () => {
          event.preventDefault()
          focusSearchOccurrence()
        },
        ArrowUp: () => {
          event.preventDefault()
          focusSearchOccurrence({ toPreviousSibling: true })
        },
      }
      
      if (eventsMap[key]) {
        eventsMap[key]()
        return
      }
    }

    input?.addEventListener('keydown', handleOnKeydown)

    return () => {
      input?.removeEventListener('keydown', handleOnKeydown)
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      focus()
    }
  }, [isLoading])

  useImperativeHandle(ref, () => ({
    focus,
    select,
    cancelSearch: handleOnClear,
  }))

  return (
    <div className="search-field_container">
      <input
        autoFocus
        ref={inputRef}
        type="text"
        aria-readonly="true"
        aria-owns="search-occurrences"
        aria-autocomplete="list"
        role="combobox"
        id="search-field"
        placeholder={isLoading ? 'Loading data...' : 'Type to search...'}
        value={searchTerm.term}
        onChange={handleOnChange}
        disabled={isLoading}
        tabIndex={0}
        spellCheck={false}
      />
      {!!searchTerm.term && !isLoading ? (
        <button type="button" className="search-field_clear-button" onClick={handleOnClear}>
          <img src={closeIcon} />
        </button>
      ) : null}
    </div>
  )
})

export default SearchField