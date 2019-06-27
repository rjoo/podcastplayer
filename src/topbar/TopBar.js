import React from 'react';
import { Button } from '@blueprintjs/core';
import { Link, withRouter } from 'react-router-dom';
import styles from './TopBar.module.scss';

function TopBar({ location }) {
  const navButton = (
    location.pathname === "/search"
      ? (<Link to="/">
          <Button icon="home" large={true} />
        </Link>)
      : (<Link to="/search">
          <Button icon="search" large={true} />
        </Link>)
  );

  return (
    <section className={styles.topbar}>
      <div>
        <Button icon="fast-backward" />
        <Button icon="play" intent="primary" large={true} />
        <Button icon="fast-forward" />
      </div>

      <div>
        {navButton}
      </div>
    </section>
  );
}

export default withRouter(TopBar);