import type { ChargeMoreProps } from '@types'
export function ChargeMore({ handleLoadMore }: ChargeMoreProps) {
  return <span onClick={handleLoadMore} className='charge-more'>Cargar más</span>
}
