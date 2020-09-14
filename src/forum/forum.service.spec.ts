import { Test, TestingModule } from '@nestjs/testing';
import { ForumService } from './services/forum.service';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';

describe('ForumService', () => {
  let service: ForumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageService, UserService, ForumService],
    }).compile();

    service = module.get<ForumService>(ForumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
