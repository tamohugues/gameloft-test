import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { ForumService, UserService, MessageService, RequestService } from './services';
import { DateScalar } from '../common/scalars/date.scalar';
import { ForumController } from './forum.controller';
import { ForumResolver } from './resolvers/forum.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { MessageResolver } from './resolvers/message.resolver';
import { RequestResolver } from './resolvers/request.resolver';

@Module({
  controllers: [ForumController],
  imports: [
    InMemoryDBModule.forFeature('user', {}),
    InMemoryDBModule.forFeature('message', {}),
    InMemoryDBModule.forFeature('forum', {}),
    InMemoryDBModule.forFeature('request', {}),
  ],
  providers: [
    DateScalar,
    MessageService,
    UserService,
    ForumService,
    RequestService,
    UserResolver,
    ForumResolver,
    MessageResolver,
    RequestResolver,
  ],
})
export class ForumModule {}
