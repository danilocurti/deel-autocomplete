import './styles.scss'
import professor from '../../../../assets/img/professor.png'

const NoResults = () => (
  <div className="search-occurrences_no-results_container">
    <span className="search-occurrences_no-results_text">No pokémons found!</span>
    <img className="search-occurrences_no-results_image" src={professor} />
  </div>
)

export default NoResults