import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface ForumEntity extends InMemoryDBEntity {
  name: string;
  members: Array<number>;
  adminId?: number;
  isPrivate: boolean;
}
