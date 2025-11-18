import { usePokemonFilter } from '@hooks/fetch-pokemons'
import { useSelectList } from '@hooks/filter-list'
import type { PokemonFiltersProps } from '@types'

export function PokemonFilters({
  typesControls,
  regionsControls,
}: PokemonFiltersProps) {
  const {
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
  } = typesControls

  const {
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
  } = regionsControls

  usePokemonFilter({ setTypes, setRegion })

  const typeSelect = useSelectList({
    list: types,
    selected: selectedType,
    setSelected: setSelectedType,
    isOpen: typeOpen,
    setIsOpen: setTypeOpen,
    match: typeMatch,
    setMatch: setTypeMatch,
    setHover: setHoveredType,
    listRef: typeListRef,
  })

  const regionSelect = useSelectList({
    list: region,
    selected: selectedRegion,
    setSelected: setSelectedRegion,
    isOpen: regionOpen,
    setIsOpen: setRegionOpen,
    match: regionMatch,
    setMatch: setRegionMatch,
    setHover: setHoveredRegion,
    listRef: regionListRef,
  })

  const resetSearchConfig = () => {
    setSelectedType('')
    setSelectedRegion('')
  }

  return (
    <section className='filters-container'>
      <section className='filters'>
        <div
          className='filter-select'
          ref={typeSelect.wrapperRef}
        >
          <input
            className='filter-display'
            value={
              hoveredType || selectedType || 'Seleccione un tipo'
            }
            readOnly
            onClick={typeSelect.toggleOpen}
            onKeyDown={typeSelect.userPressKey}
          />
          {typeOpen && (
            <ul ref={typeListRef} className='filter-list'>
              {types.map((type, index) => (
                <li
                  key={type}
                  className={index === typeMatch ? 'active' : ''}
                  onClick={() =>
                    typeSelect.selectByClick(type, index)
                  }
                >
                  {type}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          className='filter-select'
          ref={regionSelect.wrapperRef}
        >
          <input
            className='filter-display'
            value={
              hoveredRegion ||
              selectedRegion ||
              'Seleccione una región'
            }
            readOnly
            onClick={regionSelect.toggleOpen}
            onKeyDown={regionSelect.userPressKey}
          />
          {regionOpen && (
            <ul ref={regionListRef} className='filter-list'>
              {region.map((region, index) => (
                <li
                  key={region}
                  className={
                    index === regionMatch ? 'active' : ''
                  }
                  onClick={() =>
                    regionSelect.selectByClick(region, index)
                  }
                >
                  {region}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <div>
        <button
          className='clear-filter-button'
          onClick={resetSearchConfig}
        >
          Limpiar
        </button>
      </div>
    </section>
  )
}
