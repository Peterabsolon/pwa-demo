import { Injectable, InternalServerErrorException } from '@nestjs/common';
import webPush from 'web-push';

interface ISubscription {
  endpoint: string; // URL of the push service where the notification will be sent (Google, Apple, Mozilla..)
  expirationTime?: number | null; // Optional, the time when the subscription will expire (null if not applicable)
  keys: {
    p256dh: string; // User's public encryption key, used to secure the push message content
    auth: string; // Authentication secret, used to ensure the message is properly authenticated
  };
}

const VAPID_SUBJECT = '';
const VAPID_PRIVATE_KEY = '';
const VAPID_PUBLIC_KEY = '';

const DATABASE = {
  subscriptions: [] as ISubscription[],
};

@Injectable()
export class WebPushSubscriptionsService {
  private sendNotifications = async (
    subscriptions: ISubscription[],
    title: string,
    message?: string,
  ) => {
    if (!VAPID_SUBJECT || !VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
      throw new InternalServerErrorException(
        'Some VAPID environment vars are missing',
      );
    }

    const notification = JSON.stringify({
      title,
      message,
    });

    const requests = subscriptions.map(({ endpoint, keys }) => {
      webPush.sendNotification({ endpoint, keys }, notification, {
        TTL: 10000,
        vapidDetails: {
          subject: VAPID_SUBJECT,
          privateKey: VAPID_PRIVATE_KEY,
          publicKey: VAPID_PUBLIC_KEY,
        },
      });
    });

    await Promise.allSettled(requests);
  };

  async getPublicKey() {
    if (!VAPID_PUBLIC_KEY) {
      throw new InternalServerErrorException(
        'VAPID_PUBLIC_KEY missing in environment',
      );
    }

    return VAPID_PUBLIC_KEY;
  }

  subscribe(data: ISubscription) {
    DATABASE.subscriptions.push(data);
  }

  unsubscribe(endpoint: string) {
    DATABASE.subscriptions = DATABASE.subscriptions.filter(
      (sub) => sub.endpoint === endpoint,
    );
  }

  async sendNotification(title: string, message?: string) {
    await this.sendNotifications(DATABASE.subscriptions, title, message);
  }
}
