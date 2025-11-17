import { supabase } from '@lib/supabase'
import { useEffect } from 'react'
import type {
  Pokemon,
  PokemonFetchProps,
  PokemonFetchSearchProps,
  PokemonFiltersSetProps,
  PokemonMaxProps,
} from '@types'
export function useGetMaxPokemons({
  setMaxPokemons,
}: PokemonMaxProps) {
  useEffect(() => {
    async function fetchMaxPokemons() {
      const { count, error } = await supabase
        .from('pokemon')
        .select('*', { count: 'exact', head: true })

      if (error)
        return console.error(
          'Error fetching max pokemons:',
          error
        )

      setMaxPokemons(count as number)
    }

    fetchMaxPokemons()
  }, [])
}
export function useFetchPokemons({
  showWelcomePage,
  search,
  selectedType,
  selectedRegion,
  setPokemons,
  offSet,
  setFilteredCount,
}: PokemonFetchProps) {
  useEffect(() => {
    async function fetchPokemons() {
      try {
        let idQuery = supabase
          .from('pokemon_info')
          .select('id_pokemon')

        if (selectedType)
          idQuery = idQuery.ilike('tipos', `%${selectedType}%`)

        if (selectedRegion)
          idQuery = idQuery.eq('regiones', selectedRegion)

        if (search) {
          idQuery = isNaN(search as any)
            ? idQuery.ilike('nom_pokemon', `${search}%`)
            : idQuery.eq('id_pokemon', search)
        }

        const { data: filtered, error: filterError } =
          await idQuery

        if (filterError) {
          console.error('Error fetching pokemons:', filterError)
          return
        }

        if (!filtered || filtered.length === 0) {
          setFilteredCount(0)
          setPokemons([])
          return
        }

        const ids = filtered.map(p => p.id_pokemon)

        setFilteredCount(ids.length)

        const { data, error } = await supabase
          .from('pokemons')
          .select('*')
          .in('id_pokemon', ids)
          .order('id_pokemon', { ascending: true })
          .range(0, offSet - 1)

        if (error) {
          console.error('Error fetching pokemons:', error)
          return
        }

        setPokemons(data as Pokemon[])
      } catch (err) {
        console.error('Unexpected error fetching pokemons:', err)
      }
    }

    fetchPokemons()
  }, [
    showWelcomePage,
    search,
    selectedType,
    selectedRegion,
    setPokemons,
    offSet,
  ])
}
export function usePokemonFilter({
  setTypes,
  setRegion,
}: PokemonFiltersSetProps) {
  useEffect(() => {
    async function fetchPokemonFiltersType() {
      const { data, error } = await supabase
        .from('tipo')
        .select('*')

      if (error) {
        console.error('Error fetching pokemon filters:', error)
        return
      }

      const typeList = data.map((poke: { nom_tipo: string }) =>
        poke.nom_tipo.trim()
      )
      const uniqueTypes = [...new Set(typeList)]

      setTypes(uniqueTypes)
    }

    async function fetchPokemonFiltersRegion() {
      const { data, error } = await supabase
        .from('region')
        .select('*')

      if (error) {
        console.error('Error fetching pokemon filters:', error)
        return
      }

      const regionList = data.map(
        (poke: { nom_region: string }) => poke.nom_region.trim()
      )
      const uniqueRegion = [...new Set(regionList)]

      setRegion(uniqueRegion)
    }

    const fetchPokemonFilters = async () => {
      await fetchPokemonFiltersType()
      await fetchPokemonFiltersRegion()
    }

    fetchPokemonFilters()
  }, [])
}

export function useFetchCardPokemon({
  pokemonName,
  setPokemon,
}: PokemonFetchSearchProps) {
  useEffect(() => {
    async function fetchCardPokemon() {
      try {
        const { data, error } = await supabase
          .from('pokemon_info')
          .select('*')
          .ilike('nom_pokemon', `${pokemonName}%`)
          .limit(1)
          .maybeSingle()

        if (error) {
          console.error('Error fetching card pokemon:', error)
          return
        }

        setPokemon(data)
      } catch (err) {
        console.error(
          'Unexpected error fetching card pokemon:',
          err
        )
      }
    }

    fetchCardPokemon()
  }, [pokemonName, setPokemon])
}
