import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import TestMain from './pages/TestMain';
import TestPage from './components/TestPage/TestPage';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path='/test' component={TestMain} />
          <Route path="/dotest" component={TestPage}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
