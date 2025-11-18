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

export type PokemonCardProps = {
  pokemons: Pokemon[]
  search: string
  selectedType: string
  selectedRegion: string
}

interface paginationControls {
  offSet: number
  limit: number
  setOffSet: React.Dispatch<React.SetStateAction<number>>
}

interface searchControls {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  isFocused: boolean
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>
  searchMatch: number
  setSearchMatch: React.Dispatch<React.SetStateAction<number>>
  listRef: React.RefObject<HTMLUListElement | null>
}

interface typesControls {
  types: string[]
  setTypes: React.Dispatch<React.SetStateAction<string[]>>
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

interface regionsControls {
  region: string[]
  setRegion: React.Dispatch<React.SetStateAction<string[]>>
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

export type PokemonContainerProps = {
  pokemons: PokemonCardProps['pokemons']
  paginationControls: paginationControls
  searchControls: searchControls
  typesControls: typesControls
  regionsControls: regionsControls
  filteredCount: number
}

export type PokemonSearchProps = {
  pokemons: PokemonCardProps['pokemons']
  searchControls: searchControls
  paginationControls: paginationControls
}

export type PokemonFiltersProps = {
  typesControls: typesControls
  regionsControls: regionsControls
}

export type PokemonNotFoundProps = {
  search: string
  selectedType: string
  selectedRegion: string
}

export type PokemonFetchProps = {
  showWelcomePage: boolean
  search: string
  selectedType: string
  selectedRegion: string
  setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>
  offSet: number
  setFilteredCount: React.Dispatch<React.SetStateAction<number>>
}

export type PokemonFetchSearchProps = {
  pokemonName: string | undefined
  setPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>
}

export type PokemonFiltersSetProps = {
  setTypes: React.Dispatch<React.SetStateAction<string[]>>
  setRegion: React.Dispatch<React.SetStateAction<string[]>>
}

export type ShowMoreButtonProps = {
  paginationControls: paginationControls
}

export type PokemonFilterListProps = {
  list: string[]
  selected: string
  setSelected: React.Dispatch<React.SetStateAction<string>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  match: number
  setMatch: React.Dispatch<React.SetStateAction<number>>
  setHover: React.Dispatch<React.SetStateAction<string>>
  listRef: React.RefObject<HTMLUListElement>
}
