import React from 'react';
import PodcastList from './podcast/PodcastList';
import { results as topPodcastsList } from './data/top-podcasts.json';

export default function Home() {
  return (
    <div>
      <h1>Top Podcasts</h1>

      <PodcastList results={topPodcastsList} />
    </div>
  );
}
