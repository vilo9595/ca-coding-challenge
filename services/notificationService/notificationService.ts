import { Notification } from '../../components/notification';
  
  // In-memory storage for notifications
  const notifications: Notification[] = [];
  
  /**
   * Stores a notification in memory.
   * @param notification The notification to store.
   */
  export function storeNotification(notification: Notification): void {
    notifications.push(notification);
  }
  
  /**
   * Retrieves all stored notifications.
   * @returns Array of notifications.
   */
  export function getNotifications(): Notification[] {
    return notifications;
  }
