import { useState, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  getShowWelcomePage,
  saveShowWelcomePage,
} from '@logic/storage/show-welcome-menu'
import { WelcomePage } from '@components/welcomepage/welcome-page'
import { PokemonContainer } from '@components/pokemonpage/pokemon-container'
import { useWelcomePageState } from '@hooks/welcome-page-state'
import {
  useFetchPokemons,
  useGetMaxPokemons,
} from '@hooks/fetch-pokemons'
import { PokemonDetails } from '@components/dinamicpages/pokemon-details'
import type { Pokemon } from '@types'

export function App() {
  const [showWelcomePage, setWelcomePage] = useState(
    getShowWelcomePage
  )
  const [loading, setLoading] = useState(false)
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [search, setSearch] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [searchMatch, setSearchMatch] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)
  const limit = 9
  const [offSet, setOffSet] = useState(limit)
  const [maxPokemons, setMaxPokemons] = useState(0)

  const { toggleWelcomePage } = useWelcomePageState({
    setLoading,
    showWelcomePage,
    setWelcomePage,
    saveShowWelcomePage,
  })

  useGetMaxPokemons({ setMaxPokemons })

  useFetchPokemons({
    showWelcomePage,
    search,
    setPokemons,
    offSet,
  })

  return (
    <section className='App'>
      <Routes>
        <Route
          path='/'
          element={
            showWelcomePage ? (
              <WelcomePage
                toggleWelcomePage={toggleWelcomePage}
              />
            ) : loading ? (
              <div className='loader'></div>
            ) : (
              <PokemonContainer
                pokemons={pokemons}
                search={search}
                setSearch={setSearch}
                isFocused={isFocused}
                setIsFocused={setIsFocused}
                searchMatch={searchMatch}
                setSearchMatch={setSearchMatch}
                listRef={listRef}
                offSet={offSet}
                setOffSet={setOffSet}
                maxPokemons={maxPokemons}
                limit={limit}
              />
            )
          }
        />
        <Route path='/:nombre' element={<PokemonDetails />} />
      </Routes>
    </section>
  )
}
