import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import LoginPage from './view/pages/LoginPage'
import ForecastPage from './view/pages/ForecastPage'

import './assets/styles/index.css'

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={LoginPage} path="/" exact={true} />
        <Route component={ForecastPage} path="/forecast" exact={true} />
      </Switch>
    </BrowserRouter>
  )
}
