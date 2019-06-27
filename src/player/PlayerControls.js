import React from 'react';
import { Button } from '@blueprintjs/core';
import { withMediaProps } from 'react-media-player';

function PlayerControls({ media }) {
  const handlePlayPause = () => media.playPause();
  const handleSkipBackward = () => media.seekTo(media.currentTime - 15);
  const handleSkipForward = () => media.seekTo(media.currentTime + 15);

  return (
    <div>
      <Button
        icon="fast-backward"
        onClick={handleSkipBackward} />
      <Button
        icon={media.isPlaying ? 'pause' : 'play'}
        intent="primary"
        large={true}
        onClick={handlePlayPause} />
      <Button
        icon="fast-forward"
        onClick={handleSkipForward} />
    </div>
  );
}

export default withMediaProps(PlayerControls);