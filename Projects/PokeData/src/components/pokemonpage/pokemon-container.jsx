import { PokemonCard } from './pokemon-card'
import { PokemonSearch } from './pokemon-search'
export function PokemonContainer({ pokemons, search, setSearch }) {
  return (
    <section className='container'>
      <PokemonSearch search={search} setSearch={setSearch} />
      <PokemonCard pokemons={pokemons} search={search}/>
    </section>
  )
}
