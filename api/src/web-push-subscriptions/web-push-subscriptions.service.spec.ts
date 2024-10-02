import { Test, TestingModule } from '@nestjs/testing';
import { WebPushSubscriptionsService } from './web-push-subscriptions.service';

describe('WebPushSubscriptionsService', () => {
  let service: WebPushSubscriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebPushSubscriptionsService],
    }).compile();

    service = module.get<WebPushSubscriptionsService>(WebPushSubscriptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
