import { NextResponse } from 'next/server';
import { storeNotification, getNotifications } from '@/services/notificationService/notificationService';
import { forwardToMessenger } from '@/services/messengerService/messengerService';
import { v4 as uuidv4 } from 'uuid';
import { Notification } from '@/components/notification';

/**
 * Handles POST requests to the /api/notifications endpoint.
 * Stores the notification and forwards it if it's of type "Warning".
 */
export async function POST(request: Request) {
  try {
    const body: Notification = await request.json();

    // Validate notification payload
    if (!body.type || !body.description || !body.name) {
      return NextResponse.json({ error: 'Invalid notification payload' }, { status: 400 });
    }

    // Create a new notification object with ID, timestamp, type, name and description
    const notification: Notification = {
      id: uuidv4(),
      type: body.type,
      name: body.name,
      description: body.description, 
      timestamp: new Date(),
    };

    // Store and the notification
    storeNotification(notification);

    // Log all current notifications
    // console.log('Current Notifications:', getNotifications());

    // Forward the notification if it's of type "Warning"
    if (notification.type === 'Warning') {
      await forwardToMessenger(notification);
      return NextResponse.json({ status: 'Forwarded', notification }, { status: 200 });
    }
    // Return a response if the notification is of another type
    return NextResponse.json({ status: 'Ignored', notification }, { status: 200 });
  } catch (error) {
    console.error('Error processing notification:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}