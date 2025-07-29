import React from 'react';
import Root from '@theme-original/Root';
import { Analytics } from '@vercel/analytics/react';

export default function RootWrapper(props) {
  return (
    <>
      <Root {...props} />
      <Analytics />
    </>
  );
}
