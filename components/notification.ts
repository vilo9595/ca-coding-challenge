/**
 * Defines the structure of a notification.
 */
export type Notification = {
    id: string; // Unique id for the notification
    type: 'Warning' | 'Info'; // Types of notification
    name: string; // Name of the notification
    description: string; // Notification description
    timestamp: Date; // Timestamp of the notification
  };