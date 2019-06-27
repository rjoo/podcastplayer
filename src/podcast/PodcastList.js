import React, { useState } from 'react';
import { Drawer } from '@blueprintjs/core';
import PodcastContent from './PodcastContent';
import PodcastItem from './PodcastItem';
import styles from './PodcastList.module.scss';

export default function PodcastList({ results }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeResult, setActiveResult] = useState(null);

  function handleResultClick(result) {
    setActiveResult(result);
    setIsDetailsOpen(true);
  }

  function handleClose() {
    setActiveResult(null);
    setIsDetailsOpen(false);
  }

  function renderDrawerContent() {
    if (!activeResult)
      return '';

    return (
      <PodcastContent feed={activeResult.feedUrl} />
    );
  }

  return (
    <div className={styles.list}>
      {results.map(result => (
        <PodcastItem
          key={result.collectionId}
          result={result}
          onSelect={handleResultClick} />
      ))}

      <Drawer
        autoFocus={true}
        hasBackdrop={true}
        isOpen={isDetailsOpen}
        onClose={handleClose}
      >
        {renderDrawerContent()}
      </Drawer>
    </div>
  );
}
