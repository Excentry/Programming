import { Link } from 'react-router-dom'
import { useInfoColor } from '../../hooks/get-info-color'
import { getContrastYIQ } from '../../logic/functions/get-contrast-color'
import { getPokemonImg } from '../../logic/functions/get-pokemon-img'
import { PokemonNotFound } from './pokemon-not-found'
export function PokemonCard({ pokemons, search }) {
  return (
    <div className='card-container'>
      {pokemons.length > 0 ? (
        pokemons.map(poke => {
          const {
            id_pokemon,
            nom_pokemon: nombre,
            ratio_captura,
            categoria,
            generacion,
            habilidad,
            tipos: tipo,
          } = poke

          const { ratioColor, habilityColor, typeColor, categoryColor } =
            useInfoColor(ratio_captura, habilidad, tipo, categoria)

          const PokeName = nombre.toLowerCase().trim()

          return (
            <Link
              to={`/${PokeName}`}
              key={id_pokemon}
              className='pokemon-card-link'
            >
              <div key={id_pokemon} className='pokemon-card'>
                <img
                  src={getPokemonImg(id_pokemon)}
                  alt={nombre}
                  type='image/png'
                  loading='lazy'
                  style={{ background: categoryColor }}
                />
                <h1 className='pokemon-card-name'>{nombre}</h1>
                <h2 className='pokemon-card-info'>Ratio de captura: </h2>
                <span
                  className='pokemon-card-data ratio'
                  style={{
                    backgroundColor: ratioColor,
                    color: getContrastYIQ(ratioColor),
                  }}
                >
                  {ratio_captura}%
                </span>
                <h2 className='pokemon-card-info'>Habilidad: </h2>
                <span
                  className='pokemon-card-data hability'
                  style={{
                    backgroundColor: habilityColor,
                    color: getContrastYIQ(habilityColor),
                  }}
                >
                  {habilidad}
                </span>
                <h2 className='pokemon-card-info'>Tipo: </h2>
                <div className='type-data'>
                  {tipo?.split(',').map((type, i) => (
                    <span
                      key={i}
                      className='pokemon-card-data type'
                      style={{
                        backgroundColor: typeColor[i],
                        color: getContrastYIQ(typeColor[i]),
                      }}
                    >
                      {type.trim()}
                    </span>
                  ))}
                </div>
                <h2 className='pokemon-card-info'>Categoria: </h2>
                <span
                  className='pokemon-card-data category'
                  style={{
                    backgroundColor: categoryColor,
                    color: getContrastYIQ(categoryColor),
                  }}
                >
                  {categoria}
                </span>
              </div>
            </Link>
          )
        })
      ) : (
        <PokemonNotFound search={search} />
      )}
    </div>
  )
}
