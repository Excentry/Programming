import { PokemonCard } from '@components/pokemonpage/pokemon-card'
import { PokemonSearch } from '@components/pokemonpage/pokemon-search'
import type { PokemonContainerProps } from '@types'

export function PokemonContainer({
  pokemons,
  search,
  setSearch,
  isFocused,
  setIsFocused,
  searchMatch,
  setSearchMatch,
  listRef,
}: PokemonContainerProps) {
  return (
    <section className='container'>
      <PokemonSearch
        pokemons={pokemons}
        search={search}
        setSearch={setSearch}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        searchMatch={searchMatch}
        setSearchMatch={setSearchMatch}
        listRef={listRef}
      />
      <PokemonCard pokemons={pokemons} search={search} />
    </section>
  )
}
