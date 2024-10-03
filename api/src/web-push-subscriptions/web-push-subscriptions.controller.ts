import { Body, Controller, Get, Post } from '@nestjs/common';

import {
  ISubscription,
  WebPushSubscriptionsService,
} from './web-push-subscriptions.service';

@Controller('web-push-subscriptions')
export class WebPushSubscriptionsController {
  constructor(
    private readonly webPushSubscriptions: WebPushSubscriptionsService,
  ) {}

  @Get('/public-key')
  async getPublicKey(): Promise<string> {
    return this.webPushSubscriptions.getPublicKey();
  }

  @Post('/subscribe')
  async subscribe(@Body() data: ISubscription) {
    return this.webPushSubscriptions.subscribe(data);
  }

  @Post('/unsubscribe')
  async unsubscribe(@Body() { endpoint }: { endpoint: string }) {
    return this.webPushSubscriptions.unsubscribe(endpoint);
  }

  /**
   * For testing...
   */
  @Post('/notify')
  async notify(@Body() { title, message }: { title: string; message: string }) {
    return this.webPushSubscriptions.sendNotification(title, message);
  }
}
