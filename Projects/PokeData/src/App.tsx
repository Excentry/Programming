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

  const [types, setTypes] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState('')
  const [typeOpen, setTypeOpen] = useState(false)
  const [typeMatch, setTypeMatch] = useState(0)
  const [hoveredType, setHoveredType] = useState('')
  const typeListRef = useRef<HTMLUListElement>(null)

  const [region, setRegion] = useState<string[]>([])
  const [selectedRegion, setSelectedRegion] = useState('')
  const [regionOpen, setRegionOpen] = useState(false)
  const [regionMatch, setRegionMatch] = useState(0)
  const [hoveredRegion, setHoveredRegion] = useState('')
  const regionListRef = useRef<HTMLUListElement>(null)

  const [filteredCount, setFilteredCount] = useState(0)

  const { toggleWelcomePage } = useWelcomePageState({
    setLoading,
    showWelcomePage,
    setWelcomePage,
    saveShowWelcomePage,
  })

  useFetchPokemons({
    showWelcomePage,
    search,
    selectedType,
    selectedRegion,
    setPokemons,
    offSet,
    setFilteredCount,
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
                paginationControls={{
                  offSet,
                  setOffSet,
                  limit,
                }}
                searchControls={{
                  search,
                  setSearch,
                  isFocused,
                  setIsFocused,
                  searchMatch,
                  setSearchMatch,
                  listRef,
                }}
                typesControls={{
                  types,
                  setTypes,
                  selectedType,
                  setSelectedType,
                  typeOpen,
                  setTypeOpen,
                  typeMatch,
                  setTypeMatch,
                  hoveredType,
                  setHoveredType,
                  typeListRef,
                }}
                regionsControls={{
                  region,
                  setRegion,
                  selectedRegion,
                  setSelectedRegion,
                  regionOpen,
                  setRegionOpen,
                  regionMatch,
                  setRegionMatch,
                  hoveredRegion,
                  setHoveredRegion,
                  regionListRef,
                }}
                filteredCount={filteredCount}
              />
            )
          }
        />
        <Route path='/:nombre' element={<PokemonDetails />} />
      </Routes>
    </section>
  )
}
