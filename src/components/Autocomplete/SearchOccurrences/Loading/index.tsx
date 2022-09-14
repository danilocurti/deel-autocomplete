import './styles.scss'
import pokedex from '../../../../assets/img/pokedex.png'

const Loading = () => (
  <div className="search-occurrences_blank-search_container">
    <img className="search-occurrences_blank-search_image" src={pokedex} />
  </div>
)

export default Loading