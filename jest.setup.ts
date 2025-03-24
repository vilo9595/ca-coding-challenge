// Mock the global fetch function to prevent real network requests
global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({}),
  });
  
  // Set environment variables for tests
  process.env.DISCORD_WEBHOOK_URL = 'https://mock-webhook-url.com';
  
  // Suppress console errors during tests
  jest.spyOn(console, 'error').mockImplementation(() => {});