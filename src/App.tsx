import React from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import { Questions } from './components/Question';
import { Home } from './components/Home';
import { Final } from './components/Final';

function App() {
  return (
    <>
    <Switch>
      <Route path="/" component={Home} exact/>
        
      <Route path="/final" component={Final} exact/>
      <Route path="/questions" component={Questions} exact/>
    </Switch>
      
    </>
  );
}

export default App;
