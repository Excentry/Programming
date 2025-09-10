import {
  RatioColor,
  HabilityColor,
  TypeColor,
  CategoryColor,
} from '../logic/colors'

export function useInfoColor(ratio, hability, type, category) {
  const ratioClass = ratio < 20 ? 'bajo' : ratio < 50 ? 'medio' : 'alto'
  const ratioColor = RatioColor[ratioClass] || '#000000'

  const habilityColor =
    HabilityColor[hability?.toLowerCase().trim().replace(/ /g, '_')] || '#000000'
  const categoryColor =
    CategoryColor[category?.toLowerCase().trim().replace(/ /g, '_')] || '#000000'

  const typeColor = type
    ? type
        .split(',')
        .map(type => TypeColor[type.trim().toLowerCase()] || '#000000')
    : []

  return { ratioColor, habilityColor, typeColor, categoryColor }
}
