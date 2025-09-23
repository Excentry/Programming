import { useEffect } from 'react'
import type { WelcomeStateProps } from '@types'

export function useWelcomePageState({
  setLoading,
  showWelcomePage,
  setWelcomePage,
  saveShowWelcomePage,
}: WelcomeStateProps) {
  const toggleWelcomePage = () => {
    if (showWelcomePage === true) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setWelcomePage(!showWelcomePage)
      }, 250)
    } else {
      setWelcomePage(!showWelcomePage)
    }
  }

  useEffect(() => {
    saveShowWelcomePage(showWelcomePage)
  }, [showWelcomePage, saveShowWelcomePage])

  return { toggleWelcomePage }
}
