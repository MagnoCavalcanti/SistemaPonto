import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
 

import Rotas from './routes/routes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Rotas/>
  </StrictMode>,
)
