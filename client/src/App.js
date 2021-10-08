import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import TestReadyPage from './pages/TestReadyPage';
import TestPage from './pages/TestPage';
import Home from './pages/Home';
import Intro from './components/Intro/Intro';
import Result from './pages/Result';
import Content from './pages/Content';
// import Recommendation from './components/Recommendation/Recommendation';
import TestForm_multipleAnswer from './components/TestPage/TestForm_multipleAnswer';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path='/test' component={TestReadyPage} />
          <Route path="/dotest" component={TestPage}></Route>
          <Route exact path="/intro" component={Intro} />
          {/* <Route exact path="/recommendation" component={Recommendation} /> */}
          <Route exact path="/result" component={Result} />
          <Route exact path="/content" component={Content} />
          <Route exact path="/qqq" component={TestForm_multipleAnswer} />
          <Route path="/">NOT FOUND</Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
