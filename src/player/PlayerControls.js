import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Popover, Slider } from '@blueprintjs/core';
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
    <div>
      <Button
        disabled={isDisabled}
        icon="fast-backward"
        onClick={handleSkipBackward} />
      <Button
        disabled={isDisabled}
        icon={media.isPlaying ? 'pause' : 'play'}
        intent="primary"
        large={true}
        onClick={handlePlayPause} />
      <Button
        disabled={isDisabled}
        icon="fast-forward"
        onClick={handleSkipForward} />

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
        modifiers={{
        }}
        popoverClassName="bp3-popover-content-sizing"
        position="auto"
        usePortal={false}
      >
        <Button disabled={isDisabled} icon={volume === 0 ? 'volume-off' : 'volume-up' } />
      </Popover>
    </div>
  );
}

export default withMediaProps(PlayerControls);