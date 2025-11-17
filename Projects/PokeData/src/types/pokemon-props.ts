export type Pokemon = {
  id_pokemon: number
  nom_pokemon: string
  categoria: string
  habitat: string
  generacion: number
  ratio_captura: number
  habilidad: string
  tipos: string
  evoluciones: string
  movimientos: string
  regiones: string
  tipo_evolucion: string
  id_pos?: number
  nom_pos?: string
}

export type ShowMoreButtonProps = {
  offSet: number
  setOffSet: any
  limit: number
}

export type PokemonFetchSearchProps = {
  pokemonName?: string
  setPokemon: React.Dispatch<
    React.SetStateAction<Pokemon | null>
  >
}

export type PokemonMaxProps = {
  setMaxPokemons: React.Dispatch<React.SetStateAction<number>>
}

export type PokemonFetchProps = {
  showWelcomePage: boolean
  search: string | number
  selectedType: string
  selectedRegion: string
  setPokemons: (pokemon: Pokemon[]) => void
  offSet: number
  setFilteredCount: React.Dispatch<React.SetStateAction<number>>
}

type PokemonProps = {
  pokemons: Pokemon[]
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  isFocused?: boolean
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>
  searchMatch: number
  setSearchMatch: React.Dispatch<React.SetStateAction<number>>
  listRef: React.RefObject<HTMLUListElement | null>
}

export type PokemonSearchProps = PokemonProps & {
  setOffSet: React.Dispatch<React.SetStateAction<number>>
  limit: number
}

export type PokemonFilterListProps = {
  list: string[]
  selected: string
  setSelected: React.Dispatch<React.SetStateAction<string>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  match: number
  setMatch: React.Dispatch<React.SetStateAction<number>>
  listRef: React.RefObject<HTMLUListElement | null>
  hover: string
  setHover: React.Dispatch<React.SetStateAction<string>>
}

export type PokemonFilterTypeProps = {
  selectedType: string
  setSelectedType: React.Dispatch<React.SetStateAction<string>>
  typeOpen: boolean
  setTypeOpen: React.Dispatch<React.SetStateAction<boolean>>
  typeMatch: number
  setTypeMatch: React.Dispatch<React.SetStateAction<number>>
  hoveredType: string
  setHoveredType: React.Dispatch<React.SetStateAction<string>>
  typeListRef: React.RefObject<HTMLUListElement | null>
}

export type PokemonFilterRegionProps = {
  selectedRegion: string
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>
  regionOpen: boolean
  setRegionOpen: React.Dispatch<React.SetStateAction<boolean>>
  regionMatch: number
  setRegionMatch: React.Dispatch<React.SetStateAction<number>>
  hoveredRegion: string
  setHoveredRegion: React.Dispatch<React.SetStateAction<string>>
  regionListRef: React.RefObject<HTMLUListElement | null>
}

export type PokemonFiltersSetProps = {
  setTypes: React.Dispatch<React.SetStateAction<string[]>>
  setRegion: React.Dispatch<React.SetStateAction<string[]>>
}

export type PokemonFiltersProps = PokemonFiltersSetProps &
  PokemonFilterTypeProps &
  PokemonFilterRegionProps & {
    types: string[]
    region: string[]
  }

export type PokemonContainerProps = PokemonProps &
  ShowMoreButtonProps &
  PokemonFiltersProps &
  PokemonFilterTypeProps &
  PokemonFilterRegionProps & {
    maxPokemons: number
    filteredCount: number
  }

export type PokemonCardProps = PokemonNotFoundProps & {
  pokemons: Pokemon[]
}

export type PokemonNotFoundProps = {
  search: string
  selectedType: string
  selectedRegion: string
}

export type ChargeMoreProps = {
  handleLoadMore: () => void
}
