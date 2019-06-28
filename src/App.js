import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Toaster, Position } from '@blueprintjs/core';
import Home from './Home';
import Search from './search/Search';
import TopBar from './topbar/TopBar';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

function App() {
  const { episodeTitle } = useSelector(state => state.podcast);
  let toaster;

  const handleToasterRef = ref => toaster = ref;

  useEffect(() => {
    if (episodeTitle)
      toaster.show({
        message: (<span>Now listening to <strong>{episodeTitle}</strong></span>),
        timeout: 3000,
        icon: 'music',
        intent: 'primary'
      });
  }, [episodeTitle, toaster]);

  return (
    <div className="App">
      <Toaster position={Position.TOP_LEFT} ref={handleToasterRef} />

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
