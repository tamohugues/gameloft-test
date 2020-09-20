import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { PubSub, UserInputError } from 'apollo-server-express';
import { ForumService, UserService, RequestService } from '../services';
import { Request } from '../dtos';
import { RequestInput, CreateRequestInput, CloseRequestInput } from '../inputs';

@Resolver((of) => Request)
export class RequestResolver {
  private pubSub: PubSub;
  constructor(
    private readonly forumService: ForumService,
    private readonly userService: UserService,
    private readonly requestService: RequestService,
  ) {
    this.pubSub = new PubSub();
  }

  @Subscription((returns) => Request)
  RequestAdded() {
    return this.pubSub.asyncIterator('requestAdded');
  }

  @Query((returns) => [Request])
  async availableRequests(@Args('adminId', { type: () => Int }) adminId: number) {
    const user = await this.userService.getById(adminId);
    if (!user) {
      throw new UserInputError('This user id not found.');
    }
    return await this.requestService.getManyByAdminId(adminId);
  }

  @Mutation((returns) => Request)
  async createRequest(@Args('input', { type: () => CreateRequestInput }) input: CreateRequestInput) {
    const user = await this.userService.getById(input.senderId);
    if (!user) {
      throw new UserInputError('This sender id not found.');
    }
    const forum = await this.forumService.getById(input.forumId);
    if (!forum) {
      throw new UserInputError('This forum id not found.');
    }
    if (!forum.isPrivate) {
      throw new UserInputError('This forum is not private.');
    }

    const inputParam = new RequestInput();
    inputParam.senderId = input.senderId;
    inputParam.forumId = forum.id;
    inputParam.adminId = forum.adminId;
    inputParam.isAccepted = false;
    inputParam.isClosed = false;

    const request = await this.requestService.create(inputParam);
    this.pubSub.publish('requestAdded', { requestAdded: request });
    return request;
  }

  @Mutation((returns) => Boolean)
  async closeRequest(@Args('input', { type: () => CloseRequestInput }) input: CloseRequestInput) {
    const request = await this.requestService.getById(input.requestId);
    if (!request) {
      throw new UserInputError('This sender id not found.');
    }

    if (input.isAccepted) {
      await this.forumService.join(request.forumId, request.senderId);
    }

    return await this.requestService.close(input);
  }
}
