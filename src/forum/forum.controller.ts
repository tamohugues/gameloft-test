import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './services/user.service';
import { ForumService } from './services/forum.service';
import { MessageService } from './services/message.service';

import * as usersFixtures from '../fixtures/users.json';
import * as messagesFixtures from '../fixtures/messages.json';
import * as forumsFixtures from '../fixtures/forums.json';

@ApiTags('Forum')
@Controller('forum')
export class ForumController {
  constructor(
    private readonly userService: UserService,
    private readonly forumService: ForumService,
    private readonly messageService: MessageService,
  ) {}

  @Get()
  async findContinent(@Query('id') id: number): Promise<string[]> {
    return [];
  }
}
