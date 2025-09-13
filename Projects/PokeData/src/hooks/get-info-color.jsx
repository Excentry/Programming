import {
  RatioColor,
  HabilityColor,
  TypeColor,
  CategoryColor,
  HabitatColor,
  NameColor,
  RegionColor,
  GenerationColor,
  EvolutionColor,
  MovementColor,
} from '../logic/colors'

export function useInfoColor({
  ratio,
  hability,
  type,
  category,
  habitat,
  name,
  region,
  generation,
  evolution,
  movement
}) {
  const ratioClass =
    ratio < 45
      ? 'bajo'
      : ratio < 95
      ? 'medio_bajo'
      : ratio < 155
      ? 'medio'
      : ratio < 215
      ? 'medio_alto'
      : 'alto'
  const ratioColor = RatioColor[ratioClass] || '#000000'

  const habilityColor =
    HabilityColor[hability?.toLowerCase().trim().replace(/ /g, '_')] ||
    '#000000'

  const typeColor = type
    ? type
        .split(',')
        .map(type => TypeColor[type.trim().toLowerCase()] || '#000000')
    : []

  const categoryColor =
    CategoryColor[category?.toLowerCase().trim().replace(/ /g, '_')] ||
    '#000000'

  const habitatColor =
    HabitatColor[habitat?.toLowerCase().trim().replace(/ /g, '_')] || '#000000'

  const nameColor = NameColor[name?.toLowerCase().trim()] || '#000000'

  const regionColor =
    RegionColor[region?.toLowerCase().trim().replace(/ /g, '_')] || '#000000'

  const generationColor = GenerationColor['gen' + generation] || '#000000'

  const evolutionColor =
    EvolutionColor[evolution?.toLowerCase().trim().replace(/ /g, '_')] ||
    '#000000'

  const movementColor = movement
    ? movement
        .split(',')
        .map(
          move =>
            MovementColor[move.trim().toLowerCase().replace(/ /g, '_')] ||
            '#000000'
        )
    : []

  return {
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
  }
}
