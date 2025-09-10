import { getPokemonImg } from '../../logic/functions/get-pokemon-img'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { useFetchCardPokemon } from '../../hooks/fetch-pokemons'
import { useInfoColor } from '../../hooks/get-info-color'

export function PokemonDetails() {
  const { nombre } = useParams()
  const [pokemon, setPokemon] = useState({})

  useFetchCardPokemon(nombre, setPokemon)

  const { id_pokemon, ratio_captura, habilidad, tipos: tipo, categoria } = pokemon

  const { ratioColor, habilityColor, typeColor, categoryColor } = useInfoColor(
    ratio_captura,
    habilidad,
    tipo,
    categoria
  )

  return (
    <div className='pokemon-details'>
      <Link to='/' className='return-to-cards pokemon-card-link'>
        <FaArrowAltCircleLeft />
        <span> VOLVER </span>
      </Link>
      <h2
        className='pokemon-name-details'
        style={{ background: habilityColor }}
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
        className='ratio-captura-details'
        style={{ background: ratioColor }}
      >
        <h4>Ratio de captura</h4>
        {ratio_captura}
      </span>
      <span className='habilidad-details' style={{ background: habilityColor }}>
        <h4>Habilidad</h4>
        {habilidad}
      </span>
      <span className='tipo-details' style={{ background: 'gray' }}>
        <h4 className='tipo-details-title'>Tipo</h4>
        {tipo?.split(',').map((type, i) => (
          <span
            key={i}
            style={{
              backgroundColor: typeColor[i],
            }}
            className='tipo-details-item'
          >
            {type.trim()}
          </span>
        ))}
      </span>
      <span className='categoria-details' style={{ background: categoryColor }}>
        <h4>Especie</h4>
        {categoria}
      </span>
    </div>
  )
}
