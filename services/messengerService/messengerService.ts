import { Notification } from '@/components/notification'; // Ensure the correct path to the Notification type

/**
 * Forwards a notification to a Messenger service (Discord) using a Webhook.
 * @param notification The notification to forward.
 */
export async function forwardToMessenger(notification: Notification): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  
  try {
    // Validate the Discord Webhook URL
    if (!webhookUrl) {
      throw new Error('Webhook URL is not defined');
    }

    const messageContent = `[${notification.type}] ${notification.name}: ${notification.description}`;

    // Send the notification to Discord
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'Notification Bot',
      content: messageContent,
    }),
  });

    // Check for bad response and throw an error if needed
    if (!response.ok) {
      throw new Error(`Failed to forward notification: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error forwarding notification to Discord:', error);
    throw error;
  }
}