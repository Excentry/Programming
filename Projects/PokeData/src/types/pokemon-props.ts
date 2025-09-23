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

export type PokemonContainerProps = {
  pokemons: Pokemon[]
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
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
}
