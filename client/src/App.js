import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './components/Home/Home';
import Intro from './components/Intro/Intro';
import Result from './components/Result/Result';
import Content from './components/Content/Content';
// import Recommendation from './components/Recommendation/Recommendation';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/intro" component={Intro} />
          <Route exact path="/result" component={Result} />
          {/* <Route exact path="/recommendation" component={Recommendation} /> */}
          <Route exact path="/content" component={Content} />
        </Switch>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
