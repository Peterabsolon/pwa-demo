import { Module } from '@nestjs/common';
import { WebPushSubscriptionsController } from './web-push-subscriptions.controller';
import { WebPushSubscriptionsService } from './web-push-subscriptions.service';

@Module({
  controllers: [WebPushSubscriptionsController],
  providers: [WebPushSubscriptionsService],
})
export class WebPushSubscriptionsModule {}
