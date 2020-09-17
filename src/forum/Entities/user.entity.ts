import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface UserEntity extends InMemoryDBEntity {
  firstName?: string;
  lastName?: string;
  name: string;
  picture: string;
}
