import { Module } from '@nestjs/common';
import { ForumService, MessageService, UserService } from './services';
import { ForumController } from './forum.controller';

@Module({
  controllers: [ForumController],
  providers: [MessageService, UserService, ForumService]
})
export class ForumModule {}
