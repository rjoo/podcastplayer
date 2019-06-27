import React from 'react';
import { Button } from '@blueprintjs/core';
import { Link, withRouter } from 'react-router-dom';
import { Media } from 'react-media-player';
import PlayerControls from '../player/PlayerControls';
import styles from './TopBar.module.scss';
import PlayerStatus from '../player/PlayerStatus';

function TopBar({ location }) {
  return (
    <Media>
      <section className={styles.topbar}>
        <PlayerControls />

        <PlayerStatus />

        {location.pathname === "/search"
          ? (<Link to="/">
              <Button icon="home" large={true} />
            </Link>)
          : (<Link to="/search">
              <Button icon="search" large={true} />
            </Link>)
        }
      </section>
    </Media>
  );
}

export default withRouter(TopBar);