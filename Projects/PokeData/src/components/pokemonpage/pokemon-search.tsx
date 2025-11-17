import { useSearchList } from '@hooks/search-list'
import type { PokemonSearchProps } from '@types'

export function PokemonSearch({
  pokemons,
  search,
  setSearch,
  isFocused,
  setIsFocused,
  searchMatch,
  setSearchMatch,
  listRef,
  setOffSet,
  limit,
}: PokemonSearchProps) {
  const {
    pokemonFilter,
    userPressKey,
    userChangeSearch,
    resetSearchConfig,
    addSearchMatch,
  } = useSearchList({
    pokemons,
    search,
    setSearch,
    setIsFocused,
    searchMatch,
    setSearchMatch,
    listRef,
    setOffSet,
    limit,
  })

  return (
    <div className='search-pokemon-container'>
      <input
        id='search'
        type='text'
        placeholder='Busca un pokemon'
        value={search}
        onChange={e => userChangeSearch(e.target.value)}
        onFocus={() => resetSearchConfig()}
        onBlur={() => setIsFocused(false)}
        onKeyDown={userPressKey}
        className='search-input'
        autoComplete='off'
      />

      {isFocused && pokemonFilter.length > 0 && search.length > 0 && (
        <ul className='search-pokemon-list' ref={listRef}>
          {pokemonFilter.map((poke, index) => {
            const { id_pokemon, nom_pokemon } = poke

            return (
              <li
                key={id_pokemon}
                onClick={() => setSearch(nom_pokemon)}
                style={{
                  background: index === searchMatch ? 'rgba(255, 255, 255, 0.2)' : '',
                }}
              >
                {addSearchMatch(nom_pokemon.toUpperCase())}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
