import type { PokemonNotFoundProps } from '@types'
export function PokemonNotFound({
  search,
  selectedType,
  selectedRegion,
}: PokemonNotFoundProps) {
  return (
    <section className='not-pokemons-found-container'>
      <span className='not-pokemons-found'>
        No se han encontrado pokemons con nombre o codigo
        parecido a
      </span>
      <span className='search-not-found'>
        <span className='search-not-found-text'>{search}</span>
      </span>
      <span className='not-pokemons-found'>
        {selectedType && 'de tipo ' + selectedType}
        {selectedType && selectedRegion && ' y '}
        {selectedRegion && 'de la region ' + selectedRegion}
      </span>
    </section>
  )
}
