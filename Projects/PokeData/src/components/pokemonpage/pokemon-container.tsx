import { PokemonCard } from '@components/pokemonpage/pokemon-card'
import { PokemonSearch } from '@components/pokemonpage/pokemon-search'
import { PokemonFilters } from '@components/pokemonpage/pokemon-filters'
import type { PokemonContainerProps } from '@types'
import { ShowMoreButton } from './show-more'

export function PokemonContainer({
  pokemons,
  paginationControls,
  searchControls,
  typesControls,
  regionsControls,
  filteredCount,
}: PokemonContainerProps) {
  const { search } = searchControls
  const { offSet } = paginationControls
  const { selectedType } = typesControls
  const { selectedRegion } = regionsControls

  return (
    <section className='container'>
      <PokemonSearch
        pokemons={pokemons}
        searchControls={searchControls}
        paginationControls={paginationControls}
      />
      <PokemonFilters
        typesControls={typesControls}
        regionsControls={regionsControls}
      />
      <PokemonCard
        pokemons={pokemons}
        search={search}
        selectedType={selectedType}
        selectedRegion={selectedRegion}
      />
      {offSet < filteredCount && search.length === 0 && (
        <ShowMoreButton
          paginationControls={paginationControls}
        />
      )}
    </section>
  )
}
