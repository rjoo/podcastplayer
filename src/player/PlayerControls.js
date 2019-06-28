import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Classes, Icon, Popover, Slider } from '@blueprintjs/core';
import { withMediaProps } from 'react-media-player';
import styles from './PlayerControls.module.scss';

function PlayerControls({ media }) {
  const [volume, setVolume] = useState(1);
  const isDisabled = useSelector(state => !state.podcast.mediaUrl);

  const handlePlayPause = () => media.playPause();
  const handleSkipBackward = () => media.seekTo(media.currentTime - 15);
  const handleSkipForward = () => media.seekTo(media.currentTime + 15);
  const handleVolumeChange = (val) => {
    setVolume(val);
    media.setVolume(val);
  };

  // When media changes, re-set the volume on ReactMediaPlayer
  useEffect(() => {
    if (media.volume !== volume)
      media.setVolume(volume);
  }, [media, volume]);

  return (
    <div className={styles.buttonGroup}>
      <button
        className={styles.button}
        disabled={isDisabled}
        onClick={handleSkipBackward}
      >
        <Icon icon="fast-backward" />
      </button>

      <button
        className={[styles.button, styles.buttonPlay].join(' ')}
        disabled={isDisabled}
        intent="primary"
        onClick={handlePlayPause}
      >
        <Icon icon={media.isPlaying ? 'pause' : 'play'} />
      </button>
      <button
        className={styles.button}
        disabled={isDisabled}
        onClick={handleSkipForward}
      >
        <Icon icon="fast-forward" />
      </button>


      <Popover
        content={(
          <Slider
            className={styles.slider}
            labelRenderer={false}
            min={0}
            max={1}
            onChange={handleVolumeChange}
            stepSize={0.01}
            value={volume} />
        )}
        className={styles.volume}
        disabled={isDisabled}
        minimal={true}
        popoverClassName={Classes.POPOVER_CONTENT_SIZING}
        position="auto-start"
        usePortal={false}
      >
        <button
          className={[styles.button, styles.buttonVolume, (volume === 0 ? styles.muted : '')].join(' ')}
          disabled={isDisabled}
        >
          <Icon icon={volume === 0 ? 'volume-off' : 'volume-up' } />
        </button>
      </Popover>
    </div>
  );
}

export default withMediaProps(PlayerControls);