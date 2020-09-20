import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { PubSub, UserInputError } from 'apollo-server-express';
import { ForumService, UserService, MessageService } from '../services';
import { Message } from '../dtos';
import { MessageInput } from '../inputs';

@Resolver((of) => Message)
export class MessageResolver {
  private pubSub: PubSub;
  constructor(
    private readonly forumService: ForumService,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
  ) {
    this.pubSub = new PubSub();
  }

  @Subscription((returns) => Message)
  messageAdded() {
    return this.pubSub.asyncIterator('messageAdded');
  }

  @Mutation((returns) => Message)
  async createMessage(@Args('input', { type: () => MessageInput }) input: MessageInput) {
    const user = await this.userService.getById(input.senderId);
    if (!user) {
      throw new UserInputError('This user id not found.');
    }
    const forum = await this.forumService.getById(input.forumId);
    if (!forum) {
      throw new UserInputError('This forum id not found.');
    }

    const message = await this.messageService.create(input);
    this.pubSub.publish('messageAdded', { messageAdded: message });
    return message;
  }
}
