import React from 'react';
import { Button } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import styles from './TopBar.module.scss';

export default function TopBar() {
  return (
    <section className={styles.topbar}>
      <div>
        <Button icon="fast-backward" />
        <Button icon="play" intent="primary" large={true} />
        <Button icon="fast-forward" />
      </div>

      <div>
        <Link to="/search">
          <Button icon="search" large={true} />
        </Link>
      </div>
    </section>
  );
}
