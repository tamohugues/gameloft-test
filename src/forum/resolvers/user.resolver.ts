import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { UserService } from '../services';
import { UserDto } from '../dtos';

@Resolver((of) => UserDto)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => [UserDto])
  async Users() {
    return await this.userService.getAll();
  }
}
