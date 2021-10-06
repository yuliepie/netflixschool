import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import TestMain from './pages/TestMain';
import TestPage from './components/TestPage/TestPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './components/Home/Home';
import Intro from './components/Intro/Intro';
import Recommendation from './components/Recommendation/Recommendation';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path='/test' component={TestMain} />
          <Route path="/dotest" component={TestPage}></Route>
          <Route exact path="/intro" component={Intro} />
          {/* <Route exact path="/recommendation" component={Recommendation} /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
