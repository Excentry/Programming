import { supabase } from '../lib/supabase'
import { useEffect } from 'react'
export function useFetchPokemons(showWelcomePage, search, setPokemons) {
  useEffect(() => {
    async function fetchPokemons() {
      try {
        let query = supabase.from('pokemons').select('*')

        if (search) {
          query = isNaN(search)
            ? query.ilike('nom_pokemon', `${search}%`)
            : query.eq('id_pokemon', search)
        }

        query = query.order('id_pokemon', { ascending: true })

        const { data, error } = await query

        if (error) {
          console.error('Error fetching pokemons:', error)
          return
        }

        setPokemons(data)
      } catch (err) {
        console.error('Unexpected error fetching pokemons:', err)
      }
    }

    fetchPokemons()
  }, [showWelcomePage, search, setPokemons])
}

export function useFetchCardPokemon(pokemonName, setPokemon) {
  useEffect(() => {
    async function fetchCardPokemon() {
      try {
        const { data, error } = await supabase
          .from('pokemon_info')
          .select('*')
          .ilike('nom_pokemon', `${pokemonName}%`)
          .single()

        if (error) {
          console.error('Error fetching card pokemon:', error)
          return
        }

        setPokemon(data)
      } catch (err) {
        console.error('Unexpected error fetching card pokemon:', err)
      }
    }

    fetchCardPokemon()
  }, [pokemonName, setPokemon])
}
