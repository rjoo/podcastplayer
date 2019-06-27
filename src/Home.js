import React from 'react';
import PodcastList from './podcast/PodcastList';
import { results as topPodcastsList } from './data/top-podcasts.json';

export default function Home() {
  return (
    <div>
      <h2>Top Podcasts</h2>

      <PodcastList results={topPodcastsList} />
    </div>
  );
}
