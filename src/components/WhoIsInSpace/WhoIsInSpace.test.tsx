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
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => mockAstroData,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('fetches astronaut data', async () => {
    const data = await fetchAstroData();
    expect(data).toEqual(mockAstroData);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://api.open-notify.org/astros.json'
    );
  });
});
