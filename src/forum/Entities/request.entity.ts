import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface RequestEntity extends InMemoryDBEntity {
  senderId: number;
  forumId: number;
  adminId: number;
  isAccepted: boolean;
  isClosed: boolean;
}
