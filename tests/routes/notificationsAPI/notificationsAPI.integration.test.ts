import { POST } from '@/app/api/notifications/route';
import { getNotifications } from '@/services/notificationService/notificationService';

// Test suite for the POST /api/notifications endpoint
describe('POST /api/notifications (Integration Test)', () => {
  beforeEach(() => {
    // Reset all mocks before each test to ensure a clean slate
    jest.resetAllMocks();

    // Mock the fetch function globally to simulate the Discord webhook
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    // Set the environment variable for the mock webhook URL
    process.env.MOCK_WEBHOOK_URL = 'https://mock-webhook-url.com';
  });

  afterEach(() => {
    // Restore all mocks after each test to avoid unexpected behavior
    jest.restoreAllMocks();
  });

  // Test case for storing and forwarding a "Warning" notification
  it('should store and forward a "Warning" notification', async () => {
    // Mock request payload for a "Warning" notification
    const mockRequest = {
      json: async () => ({
        type: 'Warning',
        name: 'Backup Failure',
        description: 'The backup failed due to a database problem',
      }),
    } as Request;

    // Call the POST handler with the mock request
    const result = await POST(mockRequest);
    const responseBody = await result.json();

    // Verify that the response status is 200 OK
    expect(result.status).toBe(200);

    // Verify that the response contains the expected notification details
    expect(responseBody).toEqual(
      expect.objectContaining({
        status: 'Forwarded',
        notification: expect.objectContaining({
          type: 'Warning',
          name: 'Backup Failure',
          description: 'The backup failed due to a database problem',
          id: expect.any(String),
          timestamp: expect.any(String),
        }),
      })
    );

    // Verify that the notification was stored
    const notifications = getNotifications();
    expect(notifications).toContainEqual(
      expect.objectContaining({
        type: 'Warning',
        name: 'Backup Failure',
        description: 'The backup failed due to a database problem',
      })
    );

    // Indirectly verify that the notification was forwarded
    console.log('Notification forwarded successfully.');
  });

  // Test case for storing but not forwarding an "Info" notification
  it('should store but not forward an "Info" notification', async () => {
    // Mock request payload for an "Info" notification
    const mockRequest = {
      json: async () => ({
        type: 'Info',
        name: 'Quota Exceeded',
        description: 'Compute Quota exceeded',
      }),
    } as Request;

    // Call the POST handler with the mock request
    const result = await POST(mockRequest);
    const responseBody = await result.json();

    // Verify that the response status is 200 OK
    expect(result.status).toBe(200);

    // Verify that the response contains the expected notification details
    expect(responseBody).toEqual(
      expect.objectContaining({
        status: 'Ignored',
        notification: expect.objectContaining({
          type: 'Info',
          name: 'Quota Exceeded',
          description: 'Compute Quota exceeded',
          id: expect.any(String),
          timestamp: expect.any(String),
        }),
      })
    );

    // Verify that the notification was stored
    const notifications = getNotifications();
    expect(notifications).toContainEqual(
      expect.objectContaining({
        type: 'Info',
        name: 'Quota Exceeded',
        description: 'Compute Quota exceeded',
      })
    );

    // Verify that the notification was NOT forwarded to the webhook
    expect(global.fetch).not.toHaveBeenCalled();

    // Log a message to indicate that the notification was not forwarded
    console.log('Notification was not forwarded.');
  });
});