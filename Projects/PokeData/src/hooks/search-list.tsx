import type { PokemonSearchProps } from '@types'
import { useEffect } from 'react'

export function useSearchList({
  search,
  setSearch,
  Pokemons,
  setIsFocused,
  highlightedIndex,
  setHighlightedIndex,
  listRef,
}: PokemonSearchProps) {
  const filteredPokemons = Pokemons.filter(p =>
    p.nom_pokemon.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const list = listRef?.current
    if (list) {
      const activeItem = list.children[highlightedIndex] as HTMLElement
      if (activeItem) {
        activeItem.scrollIntoView({
          block: 'nearest',
        })
      }
    }
  }, [highlightedIndex])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filteredPokemons.length) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex(prev => (prev + 1) % filteredPokemons.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex(
        prev => (prev - 1 + filteredPokemons.length) % filteredPokemons.length
      )
    } else if (e.key === 'Enter') {
      e.preventDefault()
      setSearch(filteredPokemons[highlightedIndex].nom_pokemon)
      setIsFocused(false)
    }
  }

  const highlightMatch = (name: string) => {
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

  return { filteredPokemons, handleKeyDown, highlightMatch }
}
