import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { ForumService, UserService, MessageService } from '../services';
import { ForumDto } from '../dtos';

@Resolver((of) => ForumDto)
export class ForumResolver {
  constructor(
    private readonly forumService: ForumService,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
  ) {}

  @Query((returns) => [ForumDto])
  async Continents() {
    return [];
  }
}
