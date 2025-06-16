'use client';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <form action='/auth/signout' method='POST'>
        <button type='submit'>Sign Out</button>
      </form>
    </div>
  );
}
