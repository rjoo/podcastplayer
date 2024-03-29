import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Button, NonIdealState, Tag } from '@blueprintjs/core';
import styles from './PodcastContent.module.scss';
import PodcastEpisodeButton from './PodcastEpisodeButton';

const formatDate = (date) => format(date, 'MM.DD.YYYY');

export default function PodcastContent({ feed }) {
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState(null);
  const [episodeLimit, setEpisodeLimit] = useState(50);

  const handleLimitIncrease = () => setEpisodeLimit(episodeLimit + 50);

  useEffect(() => {
    let isSubscribed = true;

    if (feed) {
      setErrorMsg('');
      setContent(null);

      async function getFeedContent() {
        try {
          setIsLoading(true);
          const response = await axios.post('/.netlify/functions/feed', {
            feed
          });

          if (!isSubscribed)
            return;

          setIsLoading(false);

          if (response.data && response.data.title)
            setContent(response.data);
          else
            setErrorMsg('We don\'t yet understand how to parse this feed yet.');
        } catch (e) {
          setIsLoading(false);
          console.error(e);
          setErrorMsg('There was an issue getting details from this podcast\'s feed.');
        }
      }

      getFeedContent();
    } else {
      setContent(null);
    }

    return () => isSubscribed = false;
  }, [feed]);

  const makeGitHubIssueUrl = () => {
    return 'https://github.com/rjoo/podcastplayer/issues/new'
      + '?title=Feed issue'
      + `&body=There was a problem parsing the feed at ${feed}`
      + '&label=bug';
  };

  const episodeList = (
    <ul className={styles.list}>
      {content && content.episodes.slice(0, episodeLimit).map(ep => (
        <li key={ep.id} className={styles.episode}>
          <Tag round={true} minimal={true}>{formatDate(ep.pubDate)}</Tag>
          {ep.link ?
            (<a
              href={ep.link}
              className={styles.episodeTitle}
              target="_blank"
              rel="noopener noreferrer">
              {ep.title}
            </a>)
            : (<strong className={styles.episodeTitle}>{ep.title}</strong>)
          }
          {/* <span className={styles.episodeSummary}>{ep.summary}</span> */}
          {ep.media && (
            <div className={styles.episodeControls}>
              <PodcastEpisodeButton episode={ep} podcast={content} />
            </div>
          )}
        </li>
      ))}

      {(content && content.episodes.length > episodeLimit) && (
        <li><Button onClick={handleLimitIncrease}>Show more</Button></li>
      )}

      {isLoading && !content && [0, 1, 2].map(n => (
        <li key={n} className={`bp3-skeleton ${styles.episode}`}>&nbsp;</li>
      ))}
    </ul>
  );

  return (
    <section className={styles.section}>
      {errorMsg ? (
        <NonIdealState
          icon="error"
          title="Woops"
        >
          {errorMsg}
          <a href={makeGitHubIssueUrl()} target="_blank" rel="noreferrer noopener">Submit an issue</a>.
        </NonIdealState>
      ) : (
        <React.Fragment>
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
        </React.Fragment>
      )}
    </section>
  );
}
