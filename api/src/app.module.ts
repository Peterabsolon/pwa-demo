import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebPushSubscriptionsModule } from './web-push-subscriptions/web-push-subscriptions.module';

@Module({
  imports: [WebPushSubscriptionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
