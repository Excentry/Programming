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
  setPokemons: (pokemon: Pokemon[]) => void
  offSet: number
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

export type PokemonContainerProps = PokemonProps &
  ShowMoreButtonProps & {
    maxPokemons: number
  }

export type PokemonSearchProps = PokemonProps & {
  setOffSet: React.Dispatch<React.SetStateAction<number>>
  limit: number
}

export type PokemonCardProps = {
  pokemons: Pokemon[]
  search: string
}

export type PokemonNotFoundProps = {
  search: string
}

export type ChargeMoreProps = {
  handleLoadMore: () => void
}
