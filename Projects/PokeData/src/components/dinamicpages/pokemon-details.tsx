import { getPokemonImg } from '@logic/functions/get-pokemon-img'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { useFetchCardPokemon } from '@hooks/fetch-pokemons'
import { useInfoColor } from '@hooks/get-info-color'
import { getContrastYIQ } from '@logic/functions/get-contrast-color'
import type { Pokemon } from '@types'

export function PokemonDetails() {
  const { nombre } = useParams()
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [showEvolutionPopup, setShowEvolutionPopup] =
    useState(false)
  const [closing, setClosing] = useState(false)

  function openPopup() {
    setShowEvolutionPopup(true)
  }

  function closePopup() {
    setClosing(true)
    setTimeout(() => {
      setShowEvolutionPopup(false)
      setClosing(false)
    }, 300)
  }

  useFetchCardPokemon({ pokemonName: nombre, setPokemon })

  if (!pokemon) return null

  const {
    id_pokemon,
    ratio_captura,
    habitat,
    habilidad,
    generacion,
    tipos: tipo,
    categoria,
    evoluciones: evolucion,
    movimientos,
    regiones: region,
    tipo_evolucion,
    id_pos,
    nom_pos,
  } = pokemon

  const {
    ratioColor,
    habilityColor,
    typeColor,
    categoryColor,
    habitatColor,
    nameColor,
    regionColor,
    generationColor,
    evolutionColor,
    movementColor,
  } = useInfoColor({
    ratio: ratio_captura,
    hability: habilidad,
    type: tipo,
    category: categoria,
    habitat: habitat,
    name: nombre,
    region: region,
    generation: generacion,
    evolution: tipo_evolucion,
    movement: movimientos,
  })

  const lightGray = '#8f8f8fff'

  return (
    <section>
      <Link to='/' className='return-to-cards pokemon-card-link'>
        <FaArrowAltCircleLeft />
        <span> VOLVER </span>
      </Link>
      <div className='pokemon-details'>
        <h2
          className='pokemon-name-details'
          style={{
            background: nameColor,
            color: getContrastYIQ(nameColor),
          }}
        >
          {nombre}
        </h2>
        <img
          src={getPokemonImg(id_pokemon)}
          alt={nombre}
          data-type='image/png'
          className='pokemon-details-image'
        />
        <span
          className='capture-ratio-details span-details'
          style={{
            background: ratioColor,
            color: getContrastYIQ(ratioColor),
          }}
        >
          <h4>Ratio de captura</h4>
          {ratio_captura}
        </span>
        <span
          className='hability-details span-details'
          style={{
            background: habilityColor,
            color: getContrastYIQ(habilityColor),
          }}
        >
          <h4>Habilidad</h4>
          {habilidad}
        </span>
        <span
          className='type-details span-details'
          style={{
            background: lightGray,
            color: getContrastYIQ(lightGray),
          }}
        >
          <h4 className='type-details-title title-details'>
            Tipo
          </h4>
          {tipo?.split(',').map((type: string, i: number) => (
            <span
              key={i}
              style={{
                background: typeColor[i],
                color: getContrastYIQ(typeColor[i]),
              }}
              className='type-details-item'
            >
              {type.trim()}
            </span>
          ))}
        </span>
        <span
          className='category-details span-details'
          style={{
            background: categoryColor,
            color: getContrastYIQ(categoryColor),
          }}
        >
          <h4>Especie</h4>
          {categoria}
        </span>
        <span
          className='habitat-details span-details'
          style={{
            background: habitatColor,
            color: getContrastYIQ(habitatColor),
          }}
        >
          <h4>Habitat</h4>
          {habitat}
        </span>
        <span
          className='generation-details span-details'
          style={{
            background: generationColor,
            color: getContrastYIQ(generationColor),
          }}
        >
          <h4>Generacion</h4>
          {generacion}
        </span>
        <span
          className='evolution-details span-details'
          style={{
            background: evolutionColor,
            color: getContrastYIQ(evolutionColor),
          }}
          onClick={openPopup}
        >
          <h4>Evolucion</h4>
          {evolucion || 'No hay evolucion'}
        </span>
        {showEvolutionPopup && id_pos && (
          <div
            className={`evolution-popup ${
              closing ? 'hidden' : 'show'
            }`}
            title='Click en cualquier lado fuera de la imagen para salir.'
          >
            <h1
              className='evolution-popup-close'
              onClick={closePopup}
            >
              X
            </h1>
            <Link
              to={`/${nom_pos}`}
              className='evo-item'
              onClick={closePopup}
            >
              <img src={getPokemonImg(id_pos)} />
            </Link>
            <span
              className='evo-text'
              style={
                {
                  '--popup-txt-shadow': nameColor,
                } as React.CSSProperties
              }
            >
              IR A EVOLUCION
            </span>
          </div>
        )}
        <span
          className='region-details span-details'
          style={{
            background: regionColor,
            color: getContrastYIQ(regionColor),
          }}
        >
          <h4>Region</h4>
          {region || 'Work in progress'}
        </span>

        <span
          className='movements-details span-details'
          style={{
            background: lightGray,
            color: getContrastYIQ(lightGray),
          }}
        >
          <h4 className='movements-details-title title-details'>
            Movimientos
          </h4>
          {movimientos ? (
            movimientos
              ?.split(',')
              .map((move: string, i: number) => (
                <span
                  key={i}
                  style={{
                    background: movementColor[i],
                    color: getContrastYIQ(movementColor[i]),
                  }}
                  className='movements-details-item'
                >
                  {move.trim()}
                </span>
              ))
          ) : (
            <center>
              <span>Work in progress</span>
            </center>
          )}
        </span>
      </div>
    </section>
  )
}
