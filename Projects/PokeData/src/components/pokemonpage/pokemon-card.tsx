import { Link } from 'react-router-dom'
import { useInfoColor } from '@hooks/get-info-color'
import { getContrastYIQ } from '@logic/functions/get-contrast-color'
import { getPokemonImg } from '@logic/functions/get-pokemon-img'
import { PokemonNotFound } from '@components/pokemonpage/pokemon-not-found'
import type { PokemonCardProps, UseInfoColorProps } from '@types'
import type React from 'react'

export function PokemonCard({
  pokemons,
  search,
  selectedType,
  selectedRegion,
}: PokemonCardProps) {
  return (
    <div className='card-container'>
      {pokemons.length > 0
        ? pokemons.map(poke => {
            const {
              id_pokemon,
              nom_pokemon: nombre,
              ratio_captura,
              categoria,
              habilidad,
              tipos: tipo,
            } = poke

            const {
              ratioColor,
              habilityColor,
              typeColor,
              categoryColor,
              nameColor,
            } = useInfoColor({
              ratio: ratio_captura,
              hability: habilidad,
              type: tipo,
              category: categoria,
              name: nombre,
            } as UseInfoColorProps)

            const PokeName = nombre.toLowerCase().trim()

            return (
              <Link
                to={`/${PokeName}`}
                key={id_pokemon}
                className='pokemon-card-link'
              >
                <div
                  key={id_pokemon}
                  className='pokemon-card'
                  style={
                    {
                      '--border-hover-color': nameColor,
                    } as React.CSSProperties
                  }
                >
                  <img
                    src={getPokemonImg(id_pokemon)}
                    alt={nombre}
                    date-type='image/png'
                    loading='lazy'
                    style={{ background: nameColor }}
                    className='pokemon-card-image'
                  />
                  <h1 className='pokemon-card-name'>{nombre}</h1>
                  <h2 className='pokemon-card-info'>
                    Ratio de captura:{' '}
                  </h2>
                  <span
                    className='pokemon-card-data ratio'
                    style={{
                      backgroundColor: ratioColor,
                      color: getContrastYIQ(ratioColor),
                    }}
                  >
                    {ratio_captura}%
                  </span>
                  <h2 className='pokemon-card-info'>
                    Habilidad:{' '}
                  </h2>
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
                    {tipo
                      ?.split(',')
                      .map((type: string, i: number) => (
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
                  <h2 className='pokemon-card-info'>
                    Categoria:{' '}
                  </h2>
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
        : (search || selectedType || selectedRegion) && (
            <PokemonNotFound
              search={search}
              selectedType={selectedType}
              selectedRegion={selectedRegion}
            />
          )}
    </div>
  )
}
