import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService, ForumService } from './services';
import { MessageService } from './services/message.service';

@ApiTags('Forum')
@Controller('forum')
export class ForumController {
  constructor(
    private readonly userService: UserService,
    private readonly forumService: ForumService,
    private readonly messageService: MessageService,
  ) {}

  @Get()
  async findContinent(@Query('id') id: number): Promise<any> {
    return await this.messageService.getById(5);
  }
}
