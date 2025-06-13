'use client';

import { useRouter } from 'next/navigation';
import { handleSignOut } from '../lib/auth';

export default function Dashboard() {
  const router = useRouter();

  async function onSignOut() {
    try {
      await handleSignOut(router);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={onSignOut} aria-label='Sign out button'>
        Sign out
      </button>
    </div>
  );
}
