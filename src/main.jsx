import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import * as THREE from 'three'
import App from './App'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

window.THREE = THREE

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
