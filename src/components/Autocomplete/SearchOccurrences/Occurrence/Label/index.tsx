import './styles.scss'
import { useId } from "react"
import useAutocompleteContext from '../../../../../hooks/useAutocompleteContext'

interface LabelProps {
  code: string
  label: string
}

const Label = ({ label, code }: LabelProps) => {
  const { searchTerm: { term: searchTerm } } = useAutocompleteContext()
  
  // Using breakId in order to avoid using the same text user typed
  const breakId = useId()
  const breakText = `[break-${breakId}]`
  
  const buildOccurrenceText = (text: string) => {
    // Using this way in order to keep the text even after using the split method
    const textWithBreaks = text.replaceAll(searchTerm, `${breakText}${searchTerm}${breakText}`)

    return (
      <p>
        {textWithBreaks.split(breakText).filter(textFragment => !!textFragment).map((textFragment, index) => {
          const key = `${textFragment}${index}`
          return textFragment === searchTerm ? <strong className="occurrence-label_highlight" key={key}>{searchTerm}</strong> : <span key={key}>{textFragment}</span>
        })}
      </p>
    )
  }

  return (
    <div className="occurrence-label_container">
      <small className="occurrence-label_code">
        {buildOccurrenceText(`#${code}`)}
      </small>
      <span className="occurrence-label_main-text">
        {buildOccurrenceText(label)}
      </span>
    </div>
  )
}

export default Label