import React from 'react';
import styles from './Loader.module.scss';

export const Loader: React.FC = () => (
  <div className={styles.loader} data-cy="loader">
    <div className={styles.loader__content} />
  </div>
);
