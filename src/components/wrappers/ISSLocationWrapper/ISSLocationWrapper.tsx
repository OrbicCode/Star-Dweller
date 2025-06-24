'use client';

import dynamic from 'next/dynamic';

const ISSLocation = dynamic(
  () => import('@/components/ISSLocation/ISSLocation'),
  {
    ssr: false, // Disable server-side rendering for this component
  }
);

export default function ISSLocationWrapper() {
  return <ISSLocation />;
}
