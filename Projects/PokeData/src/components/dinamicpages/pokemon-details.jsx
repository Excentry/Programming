import { getPokemonImg } from '../../logic/functions/get-pokemon-img'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { useFetchCardPokemon } from '../../hooks/fetch-pokemons'
import { useInfoColor } from '../../hooks/get-info-color'
import { getContrastYIQ } from '../../logic/functions/get-contrast-color'

export function PokemonDetails() {
  const { nombre } = useParams()
  const [pokemon, setPokemon] = useState({})

  useFetchCardPokemon(nombre, setPokemon)

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
  } = useInfoColor(
    ratio_captura,
    habilidad,
    tipo,
    categoria,
    habitat,
    nombre,
    region,
    generacion,
    tipo_evolucion,
    movimientos
  )

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
          style={{ background: nameColor, color: getContrastYIQ(nameColor) }}
        >
          {nombre}
        </h2>
        <img
          src={getPokemonImg(id_pokemon)}
          alt={nombre}
          type='image/png'
          className='pokemon-details-image'
        />
        <span
          className='capture-ratio-details span-details'
          style={{ background: ratioColor, color: getContrastYIQ(ratioColor) }}
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
          <h4 className='type-details-title title-details'>Tipo</h4>
          {tipo?.split(',').map((type, i) => (
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
        >
          <h4>Evolucion</h4>
          {evolucion || 'No hay evolucion'}
        </span>
        <span
          className='movements-details span-details'
          style={{
            background: lightGray,
            color: getContrastYIQ(lightGray),
          }}
        >
          <h4 className='movements-details-title title-details'>Movimientos</h4>
          {movimientos ? (
            movimientos?.split(',').map((move, i) => (
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
      </div>
    </section>
  )
}
