import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface MessageEntity extends InMemoryDBEntity {
  date: number;
  text: string;
  senderId: number;
  forumId: number;
}
