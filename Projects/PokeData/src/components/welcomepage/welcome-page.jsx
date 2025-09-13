export function WelcomePage({ toggleWelcomePage }) {
  return (
    <div className='welcome-page'>
      <img src='pokedex.png' alt='pokedex-image' className='pokedex-image' />
      <div className='welcome-message'>
        <div className='bubble'>
          <h1 className='welcome-title'>BIENVENIDO A POKEDATA</h1>
          <p className='welcome-text'>
            El mejor sitio para encontrar información de tus Pokémon favoritos.
          </p>
          <span className='continue-text' onClick={toggleWelcomePage}>
            Presione para continuar...
          </span>
        </div>
      </div>
    </div>
  )
}
