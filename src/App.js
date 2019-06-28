import React from 'react';
import Home from './Home';
import Search from './search/Search';
import TopBar from './topbar/TopBar';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <TopBar />

        <main className="App-main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search" component={Search} />
          </Switch>
        </main>

      </HashRouter>
    </div>
  );
}

export default App;
