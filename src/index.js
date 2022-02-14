import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App/App'
import {flights} from './flightsData'

ReactDOM.render(
  <React.StrictMode>
    <App flightsData={flights}/>
  </React.StrictMode>,
  document.getElementById('root')
)
