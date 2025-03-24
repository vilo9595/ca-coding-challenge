import { storeNotification, getNotifications } from '@/services/notificationService/notificationService'; 
import { warning, info } from '@/tests/routes/notificationsAPI/notifications.mockData'; 

// Test suite for the notificationService functions
describe('notificationService', () => {
  beforeEach(() => {
    // Clear all mocks before each test to ensure a clean slate
    jest.clearAllMocks();
  });

  // Test case: Storing a single notification
  it('should store a notification in memory', () => {
    storeNotification(warning);

    const notifications = getNotifications(); // Retrieve all stored notifications
    expect(notifications).toContainEqual(warning); // Verify that the warning notification is stored
  });

  // Test case: Storing multiple notifications
  it('should store multiple notifications in memory', () => {
    storeNotification(warning);
    storeNotification(info);

    const notifications = getNotifications(); // Retrieve all stored notifications
    // Verify that both the warning and info notifications are stored
    expect(notifications).toContainEqual(warning); 
    expect(notifications).toContainEqual(info);
  });
});