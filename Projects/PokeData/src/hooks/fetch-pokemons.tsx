import { supabase } from '@lib/supabase'
import { useEffect } from 'react'
import type {
  Pokemon,
  PokemonFetchProps,
  PokemonFetchSearchProps,
  PokemonMaxProps,
} from '@types'
export function useGetMaxPokemons({
  setMaxPokemons,
}: PokemonMaxProps) {
  useEffect(() => {
    async function getMaxPokemons() {
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

    getMaxPokemons()
  }, [])
}
export function useFetchPokemons({
  showWelcomePage,
  search,
  setPokemons,
  offSet,
}: PokemonFetchProps) {
  useEffect(() => {
    async function fetchPokemons() {
      try {
        let query = supabase
          .from('pokemons')
          .select('*')
          .range(0, offSet - 1)

        if (search) {
          query = isNaN(search as any)
            ? query.ilike('nom_pokemon', `${search}%`)
            : query.eq('id_pokemon', search)
        }

        query = query.order('id_pokemon', { ascending: true })

        const { data, error } = await query

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
  }, [showWelcomePage, search, setPokemons, offSet])
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
