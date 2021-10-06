import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import TestMain from './pages/TestMain';
import TestPage from './components/TestPage/TestPage';
import Home from './pages/Home';
import Intro from './components/Intro/Intro';
import Result from './components/Result/Result';
import Content from './components/Content/Content';
// import Recommendation from './components/Recommendation/Recommendation';



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
          <Route exact path="/result" component={Result} />
          <Route exact path="/content" component={Content} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
