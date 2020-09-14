import { Module } from '@nestjs/common';
import { ForumService } from './services/forum.service';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';
import { ForumController } from './forum.controller';

@Module({
  controllers: [ForumController],
  providers: [MessageService, UserService, ForumService]
})
export class ForumModule {}
