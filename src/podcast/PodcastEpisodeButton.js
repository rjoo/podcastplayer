import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playPodcast } from '../redux';
import { Button } from '@blueprintjs/core';

export default function PodcastEpisodeButton({ episode, podcast }) {
  const dispatch = useDispatch();
  const isPlaying = useSelector(state => state.podcast.episodeId === episode.id);
  const handlePlayStopPodcast = () => dispatch(playPodcast(
    isPlaying ? null : episode.id,
    isPlaying ? '' : podcast.title,
    isPlaying ? '' : episode.title,
    isPlaying ? '' : episode.media
  ));

  return (
    <Button
      icon={isPlaying ? 'stop' : 'play'}
      onClick={handlePlayStopPodcast}>
    </Button>
  );
}
