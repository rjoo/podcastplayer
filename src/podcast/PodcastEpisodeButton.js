import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playPodcast, stopPodcast } from '../redux';
import { Button, Icon } from '@blueprintjs/core';

export default function PodcastEpisodeButton({ episode, podcast }) {
  const dispatch = useDispatch();
  const isPlaying = useSelector(state => state.podcast.episodeId === episode.id);
  const handlePlayStopPodcast = () => {
    if (isPlaying)
      dispatch(stopPodcast());
    else
      dispatch(playPodcast(
        episode.id,
        episode.title,
        episode.media,
        podcast.collectionId,
        podcast.title
      ));
  };

  return (
    <Button
      intent={isPlaying ? 'danger' : 'success'}
      minimal={true}
      onClick={handlePlayStopPodcast}>
      <Icon icon={isPlaying ? 'stop' : 'play'} iconSize={20} />
    </Button>
  );
}
