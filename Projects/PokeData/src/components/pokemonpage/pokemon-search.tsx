import { useSearchList } from '@hooks/search-list'
import type { PokemonSearchProps } from '@types'

export function PokemonSearch({
  search,
  setSearch,
  Pokemons,
  isFocused,
  setIsFocused,
  highlightedIndex,
  setHighlightedIndex,
  listRef,
}: PokemonSearchProps) {
  const { filteredPokemons, handleKeyDown, highlightMatch } = useSearchList({
    search,
    setSearch,
    Pokemons,
    setIsFocused,
    highlightedIndex,
    setHighlightedIndex,
    listRef,
  })

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
