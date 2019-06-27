import React from 'react';
import { Button } from '@blueprintjs/core';
import { Link, withRouter } from 'react-router-dom';
import { Media, Player, controls } from 'react-media-player';
import PlayerControls from '../player/PlayerControls';
import styles from './TopBar.module.scss';

const { CurrentTime, Progress, SeekBar } = controls;

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
    <Media>
      <section className={styles.topbar}>
        <PlayerControls />

        <div>
          {/* <Player
            autoPlay={true}
            src="https://play.podtrac.com/npr-381444908/edge1.pod.npr.org/anon.npr-podcasts/podcast/npr/fa/2019/06/20190626_fa_fapodweds-68359d5e-4e4f-4f2f-9d85-57b9a77945f6.mp3?awCollectionId=381444908&awEpisodeId=734155872&orgId=1&d=2978&p=381444908&story=734155872&t=podcast&e=734155872&size=44669214&ft=pod&f=381444908"
            useAudioObject={true} /> */}
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