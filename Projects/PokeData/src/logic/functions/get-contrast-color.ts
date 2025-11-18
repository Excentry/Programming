export function getContrastYIQ(hexcolor: string) {
  hexcolor = hexcolor.replace('#', '')
  const r = parseInt(hexcolor.slice(0, 2), 16)
  const g = parseInt(hexcolor.slice(2, 2), 16)
  const b = parseInt(hexcolor.slice(4, 2), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? 'black' : 'white'
}
