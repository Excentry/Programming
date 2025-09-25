import { KEYS } from '@logic/consts'
import type { PokemonSearchProps } from '@types'
import { useEffect } from 'react'

export function useSearchList({
  search,
  setSearch,
  pokemons,
  setIsFocused,
  searchMatch,
  setSearchMatch,
  listRef,
}: PokemonSearchProps) {
  const pokemonFilter = pokemons.filter(p =>
    p.nom_pokemon.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const list = listRef?.current
    if (!list) return

    const activeItem = list.children[searchMatch] as HTMLElement
    if (activeItem) {
      activeItem.scrollIntoView({
        block: 'nearest',
      })
    }
  }, [searchMatch, listRef])

  const userPressKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!pokemonFilter.length) return

    if (e.key === KEYS.DOWN_KEY) {
      e.preventDefault()
      setSearchMatch(prev => (prev + 1) % pokemonFilter.length)
    }

    if (e.key === KEYS.UP_KEY) {
      e.preventDefault()
      setSearchMatch(
        prev => (prev - 1 + pokemonFilter.length) % pokemonFilter.length
      )
    }

    if (e.key === KEYS.ENTER_KEY) {
      e.preventDefault()
      setSearch(pokemonFilter[searchMatch].nom_pokemon)
      setIsFocused(false)
    }
  }

  const userChangeSearch = (value: string) => {
    setSearch(value)

    if (value.length > 0) {
      setIsFocused(true)
      setSearchMatch(0)
    } else {
      setIsFocused(false)
    }
  }

  const resetSearchConfig = () => {
    setIsFocused(true)
    setSearchMatch(0)
  }

  const addSearchMatch = (name: string) => {
    const lowerName = name.toLowerCase()
    const lowerSearch = search.toLowerCase()
    const startIndex = lowerName.indexOf(lowerSearch)

    if (startIndex === -1 || search === '') return name

    const before = name.slice(0, startIndex)
    const match = name.slice(startIndex, startIndex + search.length)
    const after = name.slice(startIndex + search.length)

    return (
      <>
        {before}
        <strong style={{ color: 'red' }}>{match}</strong>
        {after}
      </>
    )
  }

  return {
    pokemonFilter,
    userPressKey,
    userChangeSearch,
    resetSearchConfig,
    addSearchMatch,
  }
}
