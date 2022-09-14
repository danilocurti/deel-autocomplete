import useAutocompleteContext from "../../../../hooks/useAutocompleteContext"
import useApi from "../../../../store/api"
import { Pokemon } from "../../../../types/Pokemon"
import Image from "./Image"
import Label from "./Label"

interface OccurrenceProps {
  occurrence: Pokemon
  tabIndex: number
}

const Occurrence = ({ occurrence, tabIndex }: OccurrenceProps) => {
  const { fetchData } = useApi()
  const { setSearchTerm } = useAutocompleteContext()
  const { id, name, imageUrl } = occurrence

  const handleOnClick = async () => {
    setSearchTerm({
      term: occurrence.name,
      exactSearch: true,
    })
  }

  return (
    <li role="option" id={`search-occurrence-${id}`} key={id} onClick={handleOnClick} tabIndex={tabIndex}>
      <Label label={name} code={id!} />
      <Image originalSrc={imageUrl} />
    </li>
  )
}

export default Occurrence