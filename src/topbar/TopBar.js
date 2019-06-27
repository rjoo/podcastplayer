import React from 'react';
import { Button } from '@blueprintjs/core';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Media, Player, controls } from 'react-media-player';
import PlayerControls from '../player/PlayerControls';
import styles from './TopBar.module.scss';

const { CurrentTime, SeekBar } = controls;

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
  const { mediaUrl } = useSelector(state => state.podcast);

  const renderPlayer = () => {
    if (mediaUrl) {
      return <Player
        autoPlay={true}
        src={mediaUrl}
        useAudioObject={true} />;
    }
  };

  return (
    <Media>
      <section className={styles.topbar}>
        <PlayerControls />

        <div>
          {renderPlayer()}
          <CurrentTime />
          <SeekBar />
        </div>

        <div>
          {navButton}
        </div>
      </section>
    </Media>
  );
}

export default withRouter(TopBar);