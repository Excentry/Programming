export function PokemonNotFound({ search }) {
  return (
    <section className='not-pokemons-found-container'>
      <span className='not-pokemons-found'>
        No se han encontrado pokemons con nombre o codigo parecido a
      </span>
      <span className='search-not-found'>
        <span className='search-not-found-text'>{search}</span>
      </span>
    </section>
  )
}
