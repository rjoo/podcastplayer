import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PodcastContent.module.scss';

export default function PodcastContent({ feed }) {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState(null);

  function renderPodcastContent() {
    return (
      <div>
        <div className={styles.heading}>
          {content && <img src={getImage(content.rss.channel.image)} alt={content.rss.channel.title} />}
          <h2>
            <span className={isLoading ? 'bp3-skeleton' : undefined}>
              {content
                ? content.rss.channel.title
                : 'Lorem ipsum'}
            </span>
          </h2>
        </div>

        <p className={isLoading ? 'bp3-skeleton' : undefined}>
          {content
            ? content.rss.channel.description
          : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget tortor felis. Fusce dapibus metus in dapibus mollis. Quisque eget ex diam.'}
        </p>

        <div></div>
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
