import './styles.scss'
import Occurrence from "./Occurrence"
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react"
import Loading from "./Loading"
import BlankSearch from "./BlankSearch"
import NoResults from "./NoResults"
import useAutocompleteContext from '../../../hooks/useAutocompleteContext'

interface SearchOccurrencesProps {}

export interface SearchOccurrencesRef {
  focus: (toPreviousSibling?: boolean) => void
  selectFocused: () => void
}

const SearchOccurrences = forwardRef<SearchOccurrencesRef, SearchOccurrencesProps>(({}, ref) => {
  const {
    isLoading,
    registers,
    cancelSearch,
    focusSearchField,
    selectSearchField,
    searchTerm: { term: searchTerm },
  } = useAutocompleteContext()

  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const focus = (toPreviousSibling?: boolean) => {
    const direction = !!toPreviousSibling ? 'previousSibling' : 'nextSibling'
    const { activeElement } = document
    const isAnOccurrenceFocused = listRef.current?.contains(activeElement)

    if (isAnOccurrenceFocused && !!activeElement?.[direction]) {
      (activeElement[direction] as HTMLElement | null)?.focus()
      return
    }

    (listRef.current?.[!!toPreviousSibling ? 'lastChild' : 'firstChild'] as HTMLElement | null)?.focus()
  }

  const selectFocused = () => {
    const { activeElement } = document
    const isAnOccurrenceFocused = listRef.current?.contains(activeElement)

    if (isAnOccurrenceFocused) {
      (activeElement as HTMLElement | null)?.click()
    }

    setTimeout(() => selectSearchField(), 250)
  }

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const { key, target } = event
      const eventsMap: {[key: string]: () => void} = {
        Escape: () => cancelSearch(),
        Enter: () => selectFocused(),
        ArrowDown: () => {
          event.preventDefault()
          focus()
        },
        ArrowUp: () => {
          event.preventDefault()
          focus(true)
        },
      }

      if (!!eventsMap[key]) {
        eventsMap[key]()
        return
      }

      focusSearchField()
    }

    containerRef.current?.addEventListener('keydown', handleKeydown)

    return () => {
      containerRef.current?.removeEventListener('keydown', handleKeydown)
    }
  }, [])

  useImperativeHandle(ref, () => ({
    focus,
    selectFocused
  }))

  const statusClassName = useMemo(() => {
    if (isLoading) {
      return 'loading'
    }

    if (registers.length > 0) {
      return 'with-results'
    }

    if (!!searchTerm) {
      return 'no-results'
    }

    return 'blank-search'

  }, [registers, searchTerm, isLoading])

  const getComponentContent = () => {
    if (isLoading) {
      return <Loading />
    }

    if (registers.length > 0) {
      return (
        <ul aria-expanded="true" role="listbox" id="search-registers" ref={listRef}>
          {registers.map((register, index) => (
            <Occurrence
              key={register.id}
              occurrence={register}
              tabIndex={index+1}
            />
          ))}
        </ul>
      )
    }

    if (!!searchTerm) {
      return <NoResults />
    }

    return <BlankSearch />
  }

  return (
    <div className={`search-occurrences_container ${statusClassName}`} ref={containerRef}>
      {getComponentContent()}
    </div>
  )
})

export default SearchOccurrences