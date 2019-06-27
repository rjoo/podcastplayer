import React, { useState } from 'react';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';

export default function SearchControls({ onSearch }) {
  const [query, setQuery] = useState('');

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  }

  return (
    <div className="search-controls">
      <FormGroup
        label="Search podcast"
        labelFor="search-input"
      >
        <InputGroup
          className="bp3-round bp3-large"
          id="search-input"
          leftIcon="search"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          rightElement={<Button minimal={true} icon="circle-arrow-right" onClick={() => onSearch(query)} />} />
      </FormGroup>
    </div>
  );
}
