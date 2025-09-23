export type Pokemon = {
  id_pokemon: number
  nom_pokemon: string
  categoria: string
  habitat: string
  pok_generacion: number
  ratio_captura: number
  habilidad: string
  tipos: string
  evoluciones: string
  movimientos: string
  regiones: string
  tipo_evolucion: string
}
export type PokemonFetchProps = {
  showWelcomePage: boolean
  search: string | number
  limit: number
  offset: number
  setPokemons: (callback: (prev: Pokemon[]) => Pokemon[]) => void
}

export type PokemonContainerProps = {
  pokemons: Pokemon[]
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  isFocused: boolean
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>
  highlightedIndex: number
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>
  listRef: React.RefObject<HTMLUListElement | null>
}

export type PokemonCardProps = {
  pokemons: Pokemon[]
  search: string
}

export type PokemonNotFoundProps = {
  search: string
}

export type PokemonSearchProps = {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  Pokemons: Pokemon[]
  isFocused?: boolean
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>
  highlightedIndex: number
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>
  listRef: React.RefObject<HTMLUListElement | null>
}

export type ChargeMoreProps = {
  handleLoadMore: () => void
}
