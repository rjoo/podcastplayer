import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Button, Tag } from '@blueprintjs/core';
import styles from './PodcastContent.module.scss';

const formatDate = (date) => format(date, 'MM.DD.YYYY');

export default function PodcastContent({ feed }) {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState(null);

  function renderPodcastContent() {
    const episodeList = (
      <ul className={styles.list}>
        {content && content.episodes.map(ep => (
          <li key={ep.id} className={styles.episode}>
            <Tag round={true} minimal={true}>{formatDate(ep.pubDate)}</Tag>
            <a
              href={ep.link}
              className={styles.episodeTitle}
              target="_blank">{ep.title}</a>
            {/* <span className={styles.episodeSummary}>{ep.summary}</span> */}
            <div className={styles.episodeControls}>
              <Button icon="play" />
            </div>
          </li>
        ))}

        {isLoading && !content && [0, 1, 2].map(n => (
          <li key={n} className={`bp3-skeleton ${styles.episode}`}>&nbsp;</li>
        ))}
      </ul>
    );

    return (
      <div>
        <div className={styles.heading}>
          <div className={isLoading ? `bp3-skeleton ${styles.image}` : styles.image}>
            {content && <img src={content.image} alt={content.title} />}
          </div>

          <div className={styles.description}>
            <h2>
              <span className={isLoading ? 'bp3-skeleton' : undefined}>
                {content
                  ? content.title
                  : 'Lorem ipsum'}
              </span>
            </h2>
  
            <p className={isLoading ? 'bp3-skeleton' : undefined}>
              {content
                ? content.description
              : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget tortor felis. Fusce dapibus metus in dapibus mollis. Quisque eget ex diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget tortor felis. Fusce dapibus metus in dapibus mollis. Quisque eget ex diam.'}
            </p>
          </div>
        </div>

        <h3>Episodes</h3>
        <div>
          {episodeList}
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (feed) {
      async function getFeedContent() {
        try {
          setIsLoading(true);

          const response = await axios.post('http://localhost:8080/api/feed', {
            feed
          });

          setIsLoading(false);
          setContent(response.data);
        } catch (e) {
          setIsLoading(false);
          console.error(e);
        }
      }

      getFeedContent();
    } else {
      setContent(null);
    }
  }, [feed]);

  return (
    <section className={styles.section}>
      {renderPodcastContent()}
    </section>
  );
}
