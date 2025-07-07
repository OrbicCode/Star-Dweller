import { fetchAstroData } from './WhoIsInSpace';

global.fetch = jest.fn();

const mockAstroData = {
  people: [
    { name: 'Alice', craft: 'ISS' },
    { name: 'Bob', craft: 'ISS' },
  ],
  number: 2,
};

describe('fetchAstroData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches astronaut data', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockAstroData,
    });

    const data = await fetchAstroData();
    expect(data).toEqual(mockAstroData);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://api.open-notify.org/astros.json'
    );
  });

  it('returns null on fetch error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Network error')
    );

    const data = await fetchAstroData();
    expect(data).toBeNull();
  });
});
