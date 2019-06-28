import React, { useState } from 'react';
import axios from 'axios';
import { NonIdealState, Spinner } from '@blueprintjs/core';
import SearchControls from './SearchControls';
import PodcastList from '../podcast/PodcastList';
import styles from './Search.module.scss';

const useSample = false;

/**
 * @todo Add search response error handling
 */
export default function Search() {
  const [errorMsg, setErrorMsg] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch(q) {
    setErrorMsg('');
    setResults([]);

    if (useSample) {
      const response = require('./search-response.json');
      const results = response.results;
      setResults(results);
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.get(`https://itunes.apple.com/search?term=${q}&entity=podcast`);
      const results = response.data.results;

      setIsLoading(false);
      setResults(results);

      if (!results.length) {
        setErrorMsg('No podcast results for that search term. Try searching for something else.');
      }
    } catch (e) {
      setIsLoading(false);
      setErrorMsg('Sorry, there was an issue retrieving search results. Try again.');
      console.error(e);
    }
  }

  return (
    <div>
      <header className={styles.header}>
        <h2>Results ({results.length})</h2>
        <SearchControls onSearch={handleSearch} />
      </header>
      {isLoading && <Spinner />}

      {errorMsg && <NonIdealState
        icon="error"
        title="No results"
        description={errorMsg} />}
      <PodcastList results={results} />

      {!errorMsg && !isLoading && !results.length && <NonIdealState
        icon="search"
        description="Try searching for topics and channels like science, NPR, javascript..."
      />}
    </div>
  );
}
