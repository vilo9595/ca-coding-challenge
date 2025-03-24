import { POST } from '@/app/api/notifications/route';
import { storeNotification } from '@/services/notificationService/notificationService';
import { forwardToMessenger } from '@/services/messengerService/messengerService';
import * as notificationMock from './notifications.mockData';

// Mock the dependencies to prevent actual storage or forwarding
jest.mock('../../../services/notificationService/notificationService', () => ({
  storeNotification: jest.fn(),
}));

jest.mock('../../../services/messengerService/messengerService', () => ({
  forwardToMessenger: jest.fn(),
}));

// Test suite for the POST /api/notifications endpoint
describe('POST /api/notifications (Unit Test)', () => {
  beforeEach(() => {
    // Clear all mocks before each test to ensure a clean slate
    jest.clearAllMocks();
  });

  // Test case for a valid "Warning" notification
  it('should store and forward a "Warning" notification', async () => {
    // Mock request payload for a "Warning" notification
    const mockRequest = {
      json: async () => ({
        type: notificationMock.warning.type,
        name: notificationMock.warning.name,
        description: notificationMock.warning.description,
      }),
    } as Request;

    // Call the POST handler with the mock request
    const result = await POST(mockRequest);
    const responseBody = await result.json(); // Parse the response body into JSON

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

    // Verify that the notification was stored and forwarded
    expect(storeNotification).toHaveBeenCalled();
    expect(forwardToMessenger).toHaveBeenCalled();
  });

  // Test case for a valid "Info" notification
  it('should store but not forward an "Info" notification', async () => {
    // Mock request payload for an "Info" notification
    const mockRequest = {
      json: async () => ({
        type: notificationMock.info.type,
        name: notificationMock.info.name,
        description: notificationMock.info.description,
      }),
    } as Request;

    // Call the POST handler with the mock request
    const result = await POST(mockRequest);
    const responseBody = await result.json(); // Parse the response body into JSON

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

    // Verify that the notification was stored but NOT forwarded
    expect(storeNotification).toHaveBeenCalled();
    expect(forwardToMessenger).not.toHaveBeenCalled();
  });

  // Test case for an invalid payload
  it('should return a 400 error for invalid payload', async () => {
    // Mock request payload with invalid data
    const mockRequest = {
      json: async () => notificationMock.invalid, // Invalid payload
    } as Request;

    // Call the POST handler with the mock request
    const result = await POST(mockRequest);
    const responseBody = await result.json(); // Parse the response body into JSON

    // Verify that the response status is 400 Bad Request
    expect(result.status).toBe(400);

    // Verify that the response contains the expected error message
    expect(responseBody).toEqual(
      expect.objectContaining({
        error: 'Invalid notification payload',
      })
    );

    // Verify that the notification was neither stored nor forwarded
    expect(storeNotification).not.toHaveBeenCalled();
    expect(forwardToMessenger).not.toHaveBeenCalled();
  });

  // Test case for an exception during request parsing
  it('should return a 500 error if an exception is thrown', async () => {
    // Mock request that throws an error during JSON parsing
    const mockRequest = {
      json: async () => {
        throw new Error('Simulated error'); // Simulate an error during request parsing
      },
    } as unknown as Request;

    // Call the POST handler with the mock request
    const result = await POST(mockRequest);
    const responseBody = await result.json(); // Parse the response body into JSON

    // Verify that the response status is 500 Internal Server Error
    expect(result.status).toBe(500);

    // Verify that the response contains the expected error message
    expect(responseBody).toEqual(
      expect.objectContaining({
        error: 'Internal server error',
      })
    );
  });
});