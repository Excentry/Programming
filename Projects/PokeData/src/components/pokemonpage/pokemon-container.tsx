import { PokemonCard } from '@components/pokemonpage/pokemon-card'
import { PokemonSearch } from '@components/pokemonpage/pokemon-search'
import { PokemonFilters } from '@components/pokemonpage/pokemon-filters'
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
  types,
  setTypes,
  region,
  setRegion,
  selectedType,
  setSelectedType,
  typeOpen,
  setTypeOpen,
  typeMatch,
  setTypeMatch,
  hoveredType,
  setHoveredType,
  typeListRef,
  selectedRegion,
  setSelectedRegion,
  regionOpen,
  setRegionOpen,
  regionMatch,
  setRegionMatch,
  hoveredRegion,
  setHoveredRegion,
  regionListRef,
  filteredCount,
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
      <PokemonFilters
        types={types}
        setTypes={setTypes}
        region={region}
        setRegion={setRegion}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        typeOpen={typeOpen}
        setTypeOpen={setTypeOpen}
        typeMatch={typeMatch}
        setTypeMatch={setTypeMatch}
        hoveredType={hoveredType}
        setHoveredType={setHoveredType}
        typeListRef={typeListRef}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        regionOpen={regionOpen}
        setRegionOpen={setRegionOpen}
        regionMatch={regionMatch}
        setRegionMatch={setRegionMatch}
        hoveredRegion={hoveredRegion}
        setHoveredRegion={setHoveredRegion}
        regionListRef={regionListRef}
      />
      <PokemonCard
        pokemons={pokemons}
        search={search}
        selectedType={selectedType}
        selectedRegion={selectedRegion}
      />
      {offSet < filteredCount && search.length === 0 && (
        <ShowMoreButton
          offSet={offSet}
          setOffSet={setOffSet}
          limit={limit}
        />
      )}
    </section>
  )
}
