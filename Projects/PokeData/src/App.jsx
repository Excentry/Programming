import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  getShowWelcomePage,
  saveShowWelcomePage,
} from './logic/storage/show-welcome-menu'
import { WelcomePage } from './components/welcomepage/welcome-page'
import { PokemonContainer } from './components/pokemonpage/pokemon-container'
import { useWelcomePageState } from './hooks/welcome-page-state'
import { useFetchPokemons } from './hooks/fetch-pokemons'
import { PokemonDetails } from './components/page/pokemon-details'

export function App() {
  const [showWelcomePage, setWelcomePage] = useState(getShowWelcomePage)
  const [loading, setLoading] = useState(false)
  const [pokemons, setPokemons] = useState([])
  const [search, setSearch] = useState('')

  const { toggleWelcomePage } = useWelcomePageState({
    setLoading,
    showWelcomePage,
    setWelcomePage,
    saveShowWelcomePage,
  })

  useFetchPokemons(showWelcomePage, search, setPokemons)

  return (
    <section className='App'>
      <Routes>
        <Route
          path='/'
          element={
            loading ? (
              <div className='loader'></div>
            ) : showWelcomePage ? (
              <WelcomePage toggleWelcomePage={toggleWelcomePage} />
            ) : (
              <section>
                {!showWelcomePage && !loading && (
                  <span
                    onClick={toggleWelcomePage}
                    className='continue-text tmp'
                  >
                    Cambiar al welcome Page
                  </span>
                )}
                <PokemonContainer
                  pokemons={pokemons}
                  search={search}
                  setSearch={setSearch}
                />
              </section>
            )
          }
        />
        <Route path='/:nombre' element={<PokemonDetails />} />
      </Routes>
    </section>
  )
}
