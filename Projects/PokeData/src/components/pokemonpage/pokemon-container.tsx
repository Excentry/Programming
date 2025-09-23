import { PokemonCard } from '@components/pokemonpage/pokemon-card'
import { PokemonSearch } from '@components/pokemonpage/pokemon-search'
import type { PokemonContainerProps } from '@types'

export function PokemonContainer({
  pokemons,
  search,
  setSearch,
}: PokemonContainerProps) {
  return (
    <section className='container'>
      <PokemonSearch search={search} setSearch={setSearch} Pokemons={pokemons} />
      <PokemonCard pokemons={pokemons} search={search} />
    </section>
  )
}
