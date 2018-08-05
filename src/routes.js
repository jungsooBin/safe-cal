import React, {Component} from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'

import SafeCalendar from "./Calendar.jsx";
import Contacts from "./Calendar.jsx";


const Routes = () => (
  <div>
    <main>
      <Switch>
        <Route exact path ="/myCalendar" component={SafeCalendar} />
        <Route exact path="/contacts" component={Contacts} />
        <Redirect to="/" />
      </Switch>
    </main>
  </div>
)
  
export default Routes;