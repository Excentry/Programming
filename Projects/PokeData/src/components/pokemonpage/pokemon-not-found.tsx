import type { PokemonNotFoundProps } from '@types'
export function PokemonNotFound({
  search,
  selectedType,
  selectedRegion,
}: PokemonNotFoundProps) {
  return (
    <section className='not-pokemons-found-container'>
      <span className='not-pokemons-found'>
        <p>
          {selectedType &&
            'No se han encontrado pokemons de tipo ' +
              selectedType}
          {selectedType &&
            selectedRegion &&
            ' y de la region ' + selectedRegion}
          {selectedRegion &&
            !selectedType &&
            'No se han encontrado pokemons de la region ' +
              selectedRegion}
        </p>
        <p>
          {search &&
            'No se han encontrado pokemons con nombre o codigo parecido a '}
        </p>
      </span>
      <span className='search-not-found'>
        <span className='search-not-found-text'>{search}</span>
      </span>
      <span className='not-pokemons-found'></span>
    </section>
  )
}
