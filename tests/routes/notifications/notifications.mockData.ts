import { Notification } from '@/components/notification';

// Notifications that are forwarded to the channel
export const warning: Notification = {
  id: '1',
  type: 'Warning',
  name: 'Backup Failure',
  description: 'The backup failed due to a database problem',
  timestamp: new Date(),
};

// Notifications that are not forwarded to the channel but stored in memory
export const info: Notification = {
  id: '2',
  type: 'Info',
  name: 'Quota Exceeded',
  description: 'Compute Quota exceeded',
  timestamp: new Date(),
};

// Invalid notification for testing purposes
export const invalid = {
  type: '', // Invalid type
  name: '', // Invalid name
  description: '', // Invalid description
};