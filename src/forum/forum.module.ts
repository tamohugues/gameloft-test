import { Module } from '@nestjs/common';
import { InMemoryDBModule, InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { ForumService, UserService } from './services';
import { MessageService } from './services/message.service';
import { DateScalar } from '../common/scalars/date.scalar';
import { ForumController } from './forum.controller';
import { ForumResolver } from './resolvers/forum.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { MessageResolver } from './resolvers/message.resolver';

@Module({
  controllers: [ForumController],
  imports: [
    InMemoryDBModule.forFeature('user', {}),
    InMemoryDBModule.forFeature('message', {}),
    InMemoryDBModule.forFeature('forum', {}),
  ],
  providers: [DateScalar, MessageService, UserService, ForumService, UserResolver, ForumResolver, MessageResolver],
})
export class ForumModule {}
