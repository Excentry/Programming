import { PokemonCard } from '@components/pokemonpage/pokemon-card'
import { PokemonSearch } from '@components/pokemonpage/pokemon-search'
import type { PokemonContainerProps } from '@types'

export function PokemonContainer({
  pokemons,
  search,
  setSearch,
  isFocused,
  setIsFocused,
  highlightedIndex,
  setHighlightedIndex,
  listRef,
}: PokemonContainerProps) {
  return (
    <section className='container'>
      <PokemonSearch
        search={search}
        setSearch={setSearch}
        Pokemons={pokemons}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        highlightedIndex={highlightedIndex}
        setHighlightedIndex={setHighlightedIndex}
        listRef={listRef}
      />
      <PokemonCard pokemons={pokemons} search={search} />
    </section>
  )
}
