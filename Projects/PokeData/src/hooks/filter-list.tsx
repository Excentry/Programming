import { KEYS } from '@logic/consts'
import type { PokemonFilterListProps } from '@types'
import { useEffect, useRef } from 'react'

export function useSelectList({
  list,
  selected,
  setSelected,
  isOpen,
  setIsOpen,
  match,
  setMatch,
  setHover,
  listRef,
}: PokemonFilterListProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const listEl = listRef?.current
    if (!listEl) return

    const activeItem = listEl.children[match] as HTMLElement
    if (activeItem) {
      activeItem.scrollIntoView({ block: 'nearest' })
    }
  }, [match])

  useEffect(() => {
    function clickOutside(e: MouseEvent) {
      if (!wrapperRef.current) return

      if (!wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setHover('')
      }
    }

    document.addEventListener('mousedown', clickOutside)
    return () =>
      document.removeEventListener('mousedown', clickOutside)
  }, [])

  const userPressKey = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!isOpen) return

    if (e.key === KEYS.DOWN_KEY) {
      e.preventDefault()
      setMatch(prev => (prev + 1) % list.length)
      setHover(list[(match + 1) % list.length])
    }

    if (e.key === KEYS.UP_KEY) {
      e.preventDefault()
      setMatch(prev => (prev - 1 + list.length) % list.length)
      setHover(list[(match - 1 + list.length) % list.length])
    }

    if (e.key === KEYS.ENTER_KEY) {
      e.preventDefault()
      setSelected(list[match])
      setIsOpen(false)
      setHover('')
    }

    if (e.key === KEYS.ESC_KEY) {
      e.preventDefault()
      setSelected('')
      setHover('')
      setIsOpen(false)
    }
  }

  const selectByClick = (item: string, index: number) => {
    setSelected(item)
    setHover('')
    setMatch(index)
    setIsOpen(false)
  }

  const toggleOpen = () => {
    setIsOpen(prev => !prev)
    if (!isOpen && selected) setHover(selected)
  }

  return {
    userPressKey,
    selectByClick,
    toggleOpen,
    wrapperRef,
  }
}
