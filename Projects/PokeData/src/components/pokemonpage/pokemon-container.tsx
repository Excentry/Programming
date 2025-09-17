import { PokemonCard } from './pokemon-card'
import { PokemonSearch } from './pokemon-search'
import type { PokemonContainerProps } from '../../types'

export function PokemonContainer({
  pokemons,
  search,
  setSearch,
}: PokemonContainerProps) {
  return (
    <section className='container'>
      <PokemonSearch search={search} setSearch={setSearch} />
      <PokemonCard pokemons={pokemons} search={search} />
    </section>
  )
}
