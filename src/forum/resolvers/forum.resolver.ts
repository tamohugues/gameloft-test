import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { ForumService } from '../services';
import { ForumDto } from '../dtos';

@Resolver((of) => ForumDto)
export class ForumResolver {
  constructor(private readonly forumService: ForumService) {}

  @Query((returns) => [ForumDto])
  async JoinedForums(@Args('userId', { type: () => Int }) userId: number) {
    return await this.forumService.getJoined(userId);
  }

  @Query((returns) => [ForumDto])
  async AvailableForums(@Args('userId', { type: () => Int }) userId: number) {
    return await this.forumService.getAvailable(userId);
  }

  @Mutation((returns) => Boolean)
  async JoinForum(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('forumId', { type: () => Int }) forumId: number,
  ) {
    return await this.forumService.join(forumId, userId);
  }
}
