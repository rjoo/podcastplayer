import React from 'react';
import { Card } from '@blueprintjs/core';
import PodcastTags from './PodcastTags';
import styles from './PodcastItem.module.scss';

export default function PodcastItem({ result, onSelect }) {
  const handleClick = () => onSelect(result);
  const getTags = (result) => {
    const tags = [];

    result.genres.forEach((genre, i) => {
      tags.push({
        id: result.genreIds[i],
        label: genre,
        labelType: 'genre'
      });
    });

    if (result.collectionExplicitness) {
      let isExplicit = result.collectionExplicitness === 'explicit';

      tags.push({
        id: 'explicitness',
        label: isExplicit ? 'Explicit' : 'Clean',
        labelType: 'explicitness'
      });
    }

    return tags;
  };

  return (
    <Card
      interactive={true}
      className={styles.card}
      onClick={handleClick}
    >
      <div className={styles.image} style={{ backgroundImage: `url(${result.artworkUrl600})` }}></div>
      <h4>{result.collectionName}</h4>
      <h5>{result.artistName}</h5>

      <PodcastTags tags={getTags(result)}/>
    </Card>
  );
}
