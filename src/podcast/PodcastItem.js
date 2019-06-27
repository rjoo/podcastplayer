import React from 'react';
import { Card, Divider } from '@blueprintjs/core';
import styles from './PodcastItem.module.scss';

export default function PodcastItem({ result, onSelect }) {
  const handleClick = () => onSelect(result);

  return (
    <Card
      interactive={true}
      className={styles.card}
      onClick={handleClick}
    >
      <div className={styles.image} style={{ backgroundImage: `url(${result.artworkUrl600})` }}></div>
      <h4>{result.collectionName}</h4>
      <p>
        {result.artistName}
        <Divider tagName="span" />
        {result.primaryGenreName}
        <Divider tagName="span" />
        {result.contentAdvisoryRating}
      </p>
    </Card>
  );
}
