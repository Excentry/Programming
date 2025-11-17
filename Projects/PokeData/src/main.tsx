import '@styles/index.css'
import '@styles/App.css'
import '@styles/media-screens.css'

import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { App } from '@App'

const root = ReactDOM.createRoot(
  document.getElementById('root')!
)

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
