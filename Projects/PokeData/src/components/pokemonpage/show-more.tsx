import type { ShowMoreButtonProps } from '@types'

export function ShowMoreButton({
  offSet,
  setOffSet,
  limit,
}: ShowMoreButtonProps) {
  return (
    <button
      className='show-more'
      onClick={() => setOffSet(offSet + limit)}
    >
      Mostrar más
    </button>
  )
}
