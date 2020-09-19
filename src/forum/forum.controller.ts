import { Controller, Get, HttpStatus, NotFoundException, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService, ForumService, MessageService } from './services';
import { ForumDto, UserDto } from './dtos';

@ApiTags('Forums')
@Controller('forums')
export class ForumController {
  constructor(private readonly userService: UserService, private readonly forumService: ForumService) {}

  @Get('/:id')
  @ApiParam({ name: 'id', type: Number, required: true })
  @ApiOperation({ summary: 'find forum filter by id.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'forum selected.', type: ForumDto })
  async getForumById(@Param('id') id: number): Promise<ForumDto> {
    const forum = await this.forumService.getById(id);
    if (!forum) {
      throw new NotFoundException();
    }
    return forum;
  }

  @Get('user/:userId')
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: HttpStatus.OK, description: 'forum Joined buy user.', type: ForumDto })
  async getJoinedForum(@Param('userId') userId: number): Promise<ForumDto[]> {
    return await this.forumService.getJoined(userId);
  }
}
