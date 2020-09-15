import { Module } from '@nestjs/common';
import { ForumService, MessageService, UserService } from './services';
import { DateScalar } from '../common/scalars/date.scalar';
import { ForumController } from './forum.controller';
import { ForumResolver } from './resolvers/forum.resolver';

@Module({
  controllers: [ForumController],
  providers: [DateScalar, MessageService, UserService, ForumService, ForumResolver],
})
export class ForumModule {}
