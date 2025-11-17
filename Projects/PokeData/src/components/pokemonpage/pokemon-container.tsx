import { PokemonCard } from '@components/pokemonpage/pokemon-card'
import { PokemonSearch } from '@components/pokemonpage/pokemon-search'
import type { PokemonContainerProps } from '@types'
import { ShowMoreButton } from './show-more'

export function PokemonContainer({
  pokemons,
  search,
  setSearch,
  isFocused,
  setIsFocused,
  searchMatch,
  setSearchMatch,
  listRef,
  offSet,
  setOffSet,
  maxPokemons,
  limit,
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
        setOffSet={setOffSet}
        limit={limit}
      />
      <PokemonCard pokemons={pokemons} search={search} />
      {offSet < maxPokemons && search.length === 0 && (
        <ShowMoreButton
          offSet={offSet}
          setOffSet={setOffSet}
          limit={limit}
        />
      )}
    </section>
  )
}
