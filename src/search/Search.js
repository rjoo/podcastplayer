import React, { useState } from 'react';
import axios from 'axios';
import { NonIdealState } from '@blueprintjs/core';
import SearchControls from './SearchControls';
import PodcastList from '../podcast/PodcastList';
import styles from './Search.module.scss';

const useSample = false;

/**
 * @todo Add search response error handling
 */
export default function Search() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch(q) {
    if (useSample) {
      const response = require('./search-response.json');
      const results = response.results;
      setResults(results);
      return;
    }

    setResults([]);

    try {
      setIsLoading(true);

      const response = await axios.get(`https://itunes.apple.com/search?term=${q}&entity=podcast`);
      const results = response.data.results;

      setIsLoading(false);
      setResults(results);
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  }

  return (
    <div>
      <header className={styles.header}>
        <h2>Results ({results.length})</h2>
        <SearchControls onSearch={handleSearch} />
      </header>
      {!isLoading &&
       !results.length && <NonIdealState
        icon="error"
        title="No results" />}
      <PodcastList results={results} />
    </div>
  );
}
