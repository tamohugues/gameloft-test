import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { PubSub, UserInputError } from 'apollo-server-express';
import { ForumService, UserService } from '../services';
import { Forum } from '../dtos';
import { ForumInput } from '../inputs';

@Resolver((of) => Forum)
export class ForumResolver {
  private pubSub: PubSub;

  constructor(private readonly forumService: ForumService, private readonly userService: UserService) {
    this.pubSub = new PubSub();
  }

  @Subscription((returns) => Forum)
  forumAdded() {
    return this.pubSub.asyncIterator('forumAdded');
  }

  @Query((returns) => [Forum])
  async joinedForums(@Args('userId', { type: () => Int }) userId: number) {
    const user = await this.userService.getById(userId);
    if (!user) {
      throw new UserInputError('This user id not found.');
    }
    return await this.forumService.getJoined(userId);
  }

  @Query((returns) => [Forum])
  async availableForums(@Args('userId', { type: () => Int }) userId: number) {
    const user = await this.userService.getById(userId);
    if (!user) {
      throw new UserInputError('This user id not found.');
    }
    return await this.forumService.getAvailable(userId);
  }

  @Mutation((returns) => Forum)
  async createForum(
    @Args('name', { type: () => String }) name: string,
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    const user = await this.userService.getById(userId);
    if (!user) {
      throw new UserInputError('This user id not found.');
    }

    const input = new ForumInput();
    input.name = name;
    input.members = [userId];

    const forum = await this.forumService.create(input);
    this.pubSub.publish('recipeAdded', { recipeAdded: forum });
    return forum;
  }

  @Mutation((returns) => Boolean)
  async joinForum(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('forumId', { type: () => Int }) forumId: number,
  ) {
    const user = await this.userService.getById(userId);
    if (!user) {
      throw new UserInputError('This user id not found.');
    }
    const forum = await this.forumService.getById(forumId);

    if (!forum) {
      throw new UserInputError('This forum id not found.');
    }

    return await this.forumService.join(forumId, userId);
  }
}
