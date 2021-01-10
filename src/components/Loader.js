import '../styles/Loader.scss';

function Loader () {
  return (
    <div tabIndex="0" role="progressbar" aria-label="loading pokedex" className="loader">
      <div className="pokeball-container">
        <div className="pokeball"></div>
      </div>
    </div>
  )
}

export default Loader;
