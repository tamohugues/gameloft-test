import { Resolver, Query } from '@nestjs/graphql';

import { UserService } from '../services';
import { User } from '../dtos';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => [User])
  async Users() {
    return await this.userService.getAll();
  }
}
