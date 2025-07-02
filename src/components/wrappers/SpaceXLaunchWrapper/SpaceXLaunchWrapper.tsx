import SpaceXLaunch from '@/components/SpaceXLaunch/SpaceXLaunch';

interface LaunchData {
  id: number;
  name: string;
  provider: { name: string };
  vehicle: { name: string };
  pad: { location: { name: string } };
  t0: string;
}

export const revalidate = 3600;

async function fetchNextSpaceXLaunch() {
  const response = await fetch(
    'https://fdo.rocketlaunch.live/json/launches/next/5',
    { cache: 'force-cache' }
  );
  if (!response.ok) return null;
  const data = await response.json();

  const spaceXLaunch = data.result.find(
    (launch: LaunchData) =>
      launch.provider.name === 'SpaceX' &&
      new Date(launch.t0).getTime() > Date.now()
  );
  return spaceXLaunch || null;
}

export default async function SpaceXLaunchWrapper() {
  const launch = await fetchNextSpaceXLaunch();
  const error = !launch ? 'No upcoming SpaceX launch found.' : undefined;
  return <SpaceXLaunch launch={launch} error={error} />;
}
