import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './assets/styles/styles.sass'
import { loadUser } from './store/actions/userActions'

import { AppHeader } from './cmps/AppHeader'
import { Home } from './views/Home'
import { ContactDetails } from './views/ContactDetails'
import { ContactEdit } from './views/ContactEdit'
import { ContactPage } from './views/ContactPage'
import { StatisticPage } from './views/StatisticPage'
import { Signup } from './views/Signup'

export const App = () => {

  const { loggedUser } = useSelector(state => state.userModule)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])
  
  const SecureRoute = (props) => {
    return loggedUser.name ? <Route {...props} /> : <Redirect to="/signup" />
  }

  return (
    <Router>
      <div className="app">
        { loggedUser.name && <AppHeader />}
        <main className="container">
          <Switch>
            <SecureRoute component={ContactEdit} path="/contact/edit/:id?" />
            <SecureRoute component={ContactDetails} path="/contact/:id" />
            <SecureRoute component={ContactPage} path="/contact" />
            <SecureRoute component={StatisticPage} path="/statistic" />
            <Route component={Signup} path="/signup" />
            <SecureRoute component={Home} path="/" />
          </Switch>
        </main>
      </div>
    </Router>
  )
}