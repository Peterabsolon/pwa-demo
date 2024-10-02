import { Test, TestingModule } from '@nestjs/testing';
import { WebPushSubscriptionsController } from './web-push-subscriptions.controller';

describe('WebPushSubscriptionsController', () => {
  let controller: WebPushSubscriptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebPushSubscriptionsController],
    }).compile();

    controller = module.get<WebPushSubscriptionsController>(WebPushSubscriptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
