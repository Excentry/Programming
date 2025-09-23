import type { PokemonSearchProps } from '@types'
import { useState, useEffect, useRef } from 'react'

export function PokemonSearch({
  search,
  setSearch,
  Pokemons,
}: PokemonSearchProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)

  const filteredPokemons = Pokemons.filter(p =>
    p.nom_pokemon.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const list = listRef.current
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
        <strong style={{ color: 'red'}}>{match}</strong>
        {after}
      </>
    )
  }

  return (
    <div className='search-pokemon-container'>
      <input
        id='search'
        type='text'
        placeholder='Busca un pokemon'
        value={search}
        onChange={e => setSearch(e.target.value)}
        onFocus={() => (setIsFocused(true), setHighlightedIndex(0))}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        className='search-input'
      />

      {isFocused && filteredPokemons.length > 0 && search.length > 0 && (
        <ul className='search-pokemon-list' ref={listRef}>
          {filteredPokemons.map((poke, index) => (
            <li
              key={poke.id_pokemon}
              onClick={() => setSearch(poke.nom_pokemon)}
              style={{
                background: index === highlightedIndex ? '#f0f0f0' : 'white',
              }}
            >
              {highlightMatch(poke.nom_pokemon.toUpperCase())}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
