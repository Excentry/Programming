import { useEffect } from 'react'

export function useWelcomePageState({
  setLoading,
  showWelcomePage,
  setWelcomePage,
  saveShowWelcomePage,
}) {
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
