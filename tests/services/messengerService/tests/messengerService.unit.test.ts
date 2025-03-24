import { forwardToMessenger } from '@/services/messengerService/messengerService'; 
import { warning } from '@/tests/routes/notifications/notifications.mockData'; 

// Test suite for the forwardToMessenger function
describe('forwardToMessenger', () => {
  // Test case: Successfully sending a notification to the messenger service
  it('should send a notification to the messenger service', async () => {
    // Call the forwardToMessenger function with the mock "Warning" notification
    await forwardToMessenger(warning);

    // Verify that the fetch function was called with the correct arguments
    expect(global.fetch).toHaveBeenCalledWith(
      'https://mock-webhook-url.com', // Mocked webhook URL from jest.setup.ts
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'Notification Bot',
          content: '[Warning] Backup Failure: The backup failed due to a database problem', // Message content includes type, name, and description
        }),
      })
    );
  });

  // Test case: Handling a failure response from the messenger service
  it('should throw an error if the messenger service fails', async () => {
    // Mock the fetch function to simulate a failed response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Internal Server Error' }),
    });

    // Call the forwardToMessenger function and expect it to throw an error
    await expect(forwardToMessenger(warning)).rejects.toThrow(
      'Failed to forward notification'
    );
  });

  // Test case: Handling a missing webhook URL
  // NOTE: This test must run last because it deletes the webhook URL, which affects subsequent tests
  it('should throw an error if no webhook URL is defined', async () => {
    // Delete the DISCORD_WEBHOOK_URL environment variable
    delete process.env.DISCORD_WEBHOOK_URL;

    // Call the forwardToMessenger function and expect it to throw an error
    await expect(forwardToMessenger(warning)).rejects.toThrow(
      'Webhook URL is not defined'
    );
  });
});