export type WelcomePageProps = { toggleWelcomePage: () => void }

export type WelcomeStateProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  showWelcomePage: boolean,
  setWelcomePage: React.Dispatch<React.SetStateAction<boolean>>,
  saveShowWelcomePage: (show: boolean) => void,
}
