import './styles.scss'
import pokedex from '../../../../assets/img/pokedex.png'

const BlankSearch = () => (
  <div className="search-occurrences_blank-search_container" aria-hidden>
    <img className="search-occurrences_blank-search_image" src={pokedex} />
  </div>
)

export default BlankSearch