import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@blueprintjs/core';
import { withMediaProps } from 'react-media-player';

function PlayerControls({ media }) {
  const isDisabled = useSelector(state => !state.podcast.mediaUrl);
  const handlePlayPause = () => media.playPause();
  const handleSkipBackward = () => media.seekTo(media.currentTime - 15);
  const handleSkipForward = () => media.seekTo(media.currentTime + 15);

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
    </div>
  );
}

export default withMediaProps(PlayerControls);