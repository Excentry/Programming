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
import { numberNotSend, stringNotSend, defaultColor } from '../logic/consts'
import type { InfoColorProps } from '../types/color-info'

export function useInfoColor({
  ratio = numberNotSend,
  hability = stringNotSend,
  type = stringNotSend,
  category = stringNotSend,
  habitat = stringNotSend,
  name = stringNotSend,
  region = stringNotSend,
  generation = numberNotSend,
  evolution = stringNotSend,
  movement = stringNotSend,
}: InfoColorProps) {
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
  const ratioColor = RatioColor[ratioClass] || defaultColor

  const habilityColor =
    HabilityColor[hability?.toLowerCase().trim().replace(/ /g, '_')] ||
    defaultColor

  const typeColor = type
    ? type
        .split(',')
        .map(type => TypeColor[type.trim().toLowerCase()] || defaultColor)
    : []

  const categoryColor =
    CategoryColor[category?.toLowerCase().trim().replace(/ /g, '_')] ||
    defaultColor

  const habitatColor =
    HabitatColor[habitat?.toLowerCase().trim().replace(/ /g, '_')] ||
    defaultColor

  const nameColor = NameColor[name?.toLowerCase().trim()] || defaultColor

  const regionColor =
    RegionColor[region?.toLowerCase().trim().replace(/ /g, '_')] || defaultColor

  const generationColor = GenerationColor['gen' + generation] || defaultColor

  const evolutionColor =
    EvolutionColor[evolution?.toLowerCase().trim().replace(/ /g, '_')] ||
    defaultColor

  const movementColor = movement
    ? movement
        .split(',')
        .map(
          move =>
            MovementColor[move.trim().toLowerCase().replace(/ /g, '_')] ||
            defaultColor
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
