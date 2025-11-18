import type { ShowMoreButtonProps } from '@types'

export function ShowMoreButton({
  paginationControls,
}: ShowMoreButtonProps) {
  const { offSet, setOffSet, limit } = paginationControls

  return (
    <button
      className='show-more'
      onClick={() => setOffSet(offSet + limit)}
    >
      Mostrar más
    </button>
  )
}
