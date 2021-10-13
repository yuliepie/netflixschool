import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import TestReadyPage from './pages/TestReadyPage';
import TestPage from './pages/TestMainPage';
import Main from './pages/Main';
import Intro from './components/Intro/Intro';
import Result from './pages/Result';
import Content from './pages/Content';
// import Recommendation from './components/Recommendation/Recommendation';
// import TestForm_multipleAnswer from './components/TestPage/TestForm_multipleAnswer';
import ScrollTop from './components/common/ScrollTop'
import NotFound from './pages/NotFound';
import Sidebar from './components/common/Sidebar.js';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <ScrollTop />
      <Sidebar />
        <div className="components">
          <Switch>
              <Route exact path="/" component={Main}/>
              <Route exact path="/intro" component={Intro} />
              <Route path='/test' component={TestReadyPage} />
              <Route path="/dotest" component={TestPage}></Route>
              {/* <Route exact path="/recommendation" component={Recommendation} /> */}
              <Route exact path="/result" component={Result} />
              <Route exact path="/content" component={Content} />
              <Route path="/" component={NotFound} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
