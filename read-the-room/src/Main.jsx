import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Teacher from './pages/Teacher';
import Student from './pages/Student';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/teacher' component={Teacher}></Route>
      <Route exact path='/student' component={Student}></Route>
    </Switch>
  );
}

export default Main;