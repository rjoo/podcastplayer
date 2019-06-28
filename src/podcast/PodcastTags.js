import React from 'react';
import { Tag } from '@blueprintjs/core';
import styles from './PodcastTags.module.scss';

export default function PodcastTags({ tags }) {
  const getIntent = (tag) => {
    if (tag.id !== 'explicitness')
      return 'none';

    if (tag.label === 'Explicit')
      return 'warning';

    return 'success';
  }
  return (
    <div className={styles.tagList}>
      {tags.map(tag => (
        <Tag
          key={tag.id}
          minimal={true}
          round={true}
          intent={getIntent(tag)}
        >{tag.label}</Tag>
      ))}
    </div>
  )
}
