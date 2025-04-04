import type { ReactNode } from 'react';

import styles from './details.module.css';

export function Details(properties: {
  open?: boolean;
  summary: string | ReactNode;
  children: ReactNode;
}) {
  return (
    <details className={styles.details} open={properties.open}>
      <summary>{properties.summary}</summary>
      {properties.children}
    </details>
  );
}

export default Details;
