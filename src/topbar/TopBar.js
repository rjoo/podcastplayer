import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Icon } from '@blueprintjs/core';
import { Media } from 'react-media-player';
import PlayerControls from '../player/PlayerControls';
import PlayerStatus from '../player/PlayerStatus';
import styles from './TopBar.module.scss';

function TopBar({ location }) {
  return (
    <Media>
      <section className={styles.topbar}>
        <div className={styles.inner}>
          <div className={styles.left}>
            <PlayerControls />
          </div>
  
          <PlayerStatus />

          <nav className={styles.right}>
            {location.pathname === "/search"
              ? (<Link to="/">
                  <Icon
                    icon="home"
                    iconSize={32}
                    tagName="div"
                    title="Home" />
                </Link>)
              : (<Link to="/search">
                  <Icon
                    icon="search"
                    iconSize={32}
                    tagName="div"
                    title="Home" />
                </Link>)
            }
          </nav>
        </div>
      </section>
    </Media>
  );
}

export default withRouter(TopBar);