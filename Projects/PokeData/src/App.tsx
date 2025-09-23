import { useState, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  getShowWelcomePage,
  saveShowWelcomePage,
} from '@logic/storage/show-welcome-menu'
import { WelcomePage } from '@components/welcomepage/welcome-page'
import { PokemonContainer } from '@components/pokemonpage/pokemon-container'
import { useWelcomePageState } from '@hooks/welcome-page-state'
import { useFetchPokemons } from '@hooks/fetch-pokemons'
import { PokemonDetails } from '@components/dinamicpages/pokemon-details'
import { ChargeMore } from '@components/pokemonpage/charge-more'
import type { Pokemon } from '@types'

export function App() {
  const [showWelcomePage, setWelcomePage] = useState(getShowWelcomePage)
  const [loading, setLoading] = useState(false)
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [search, setSearch] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)
  const [offset, setOffset] = useState(0)
  const limit = 9

  const { toggleWelcomePage } = useWelcomePageState({
    setLoading,
    showWelcomePage,
    setWelcomePage,
    saveShowWelcomePage,
  })

  useFetchPokemons({ showWelcomePage, search, limit, offset, setPokemons })

  const handleLoadMore = () => {
    if (pokemons.length % limit !== 0) return

    setOffset(prev => prev + limit)
  }

  return (
    <section className='App'>
      <Routes>
        <Route
          path='/'
          element={
            showWelcomePage ? (
              <WelcomePage toggleWelcomePage={toggleWelcomePage} />
            ) : loading ? (
              <div className='loader'></div>
            ) : (
              <>
                <PokemonContainer
                  pokemons={pokemons}
                  search={search}
                  setSearch={setSearch}
                  isFocused={isFocused}
                  setIsFocused={setIsFocused}
                  highlightedIndex={highlightedIndex}
                  setHighlightedIndex={setHighlightedIndex}
                  listRef={listRef}
                />
                <ChargeMore handleLoadMore={handleLoadMore} />
              </>
            )
          }
        />
        <Route path='/:nombre' element={<PokemonDetails />} />
      </Routes>
    </section>
  )
}
