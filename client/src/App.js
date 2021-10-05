import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './components/Home/Home';
import Intro from './components/Intro/Intro';
// import Recommendation from './components/Recommendation/Recommendation';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/intro" component={Intro} />
          {/* <Route exact path="/recommendation" component={Recommendation} /> */}
        </Switch>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
