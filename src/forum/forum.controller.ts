import { Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService, ForumService, MessageService } from './services';
import { Forum, User } from './dtos';

@ApiTags('Forums')
@Controller('forums')
export class ForumController {
  constructor(private readonly userService: UserService, private readonly forumService: ForumService) {}

  @Get('/:id')
  @ApiParam({ name: 'id', type: Number, required: true })
  @ApiOperation({ summary: 'find forum filter by id.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'forum selected.', type: Forum })
  async getForumById(@Param('id') id: number): Promise<Forum> {
    const forum = await this.forumService.getById(id);
    if (!forum) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Forum id not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return forum;
  }

  @Get('user/:userId')
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: HttpStatus.OK, description: 'forum Joined buy user.', type: Forum })
  async getJoinedForum(@Param('userId') userId: number): Promise<Forum[]> {
    const user = await this.userService.getById(userId);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'This userId not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.forumService.getJoined(userId);
  }
}
