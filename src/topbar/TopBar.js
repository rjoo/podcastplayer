import React from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button } from '@blueprintjs/core';
import { Media } from 'react-media-player';
import PlayerControls from '../player/PlayerControls';
import PlayerStatus from '../player/PlayerStatus';
import styles from './TopBar.module.scss';

function TopBar({ location }) {
  const { mediaUrl } = useSelector(state => state.podcast);

  const renderPlayerStatus = () => {
    if (mediaUrl) {
      return <PlayerStatus />;
    }
  };

  return (
    <Media>
      <section className={styles.topbar}>
        <div className={styles.inner}>
          <div className={styles.left}>
            <PlayerControls />
          </div>
  
          {renderPlayerStatus()}

          <nav className={styles.right}>
            {location.pathname === "/search"
              ? (<Link to="/">
                  <Button icon="home" large={true} />
                </Link>)
              : (<Link to="/search">
                  <Button icon="search" large={true} />
                </Link>)
            }
          </nav>
        </div>
      </section>
    </Media>
  );
}

export default withRouter(TopBar);