import React from 'react';
import { useSelector } from 'react-redux';
import { Player, controls, withMediaProps } from 'react-media-player';
import styles from './PlayerStatus.module.scss';

const { CurrentTime, Duration, SeekBar } = controls;

function PlayerStatus({ media }) {
  const { podcastTitle, episodeTitle, mediaUrl } = useSelector(state => state.podcast);

  const renderPlayer = () => {
    if (mediaUrl) {
      return <Player
        autoPlay={true}
        src={mediaUrl}
        useAudioObject={true} />;
    }
  };

  return (
    <div className={styles.status}>
      {renderPlayer()}

      <h5 className={styles.title}>
        {mediaUrl && (
          <span>{episodeTitle} <em>from</em> {podcastTitle}</span>
        )}
      </h5>
      {mediaUrl && (
        <div className={styles.controls}>
          <CurrentTime className={styles.time} />
          <SeekBar className={styles.seekbar} />
          <Duration className={styles.duration} />
        </div>
      )}
    </div>
  );
}

export default withMediaProps(PlayerStatus);