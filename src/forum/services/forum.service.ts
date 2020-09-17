import { Injectable } from '@nestjs/common';
import { InjectInMemoryDBService, InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { ForumEntity } from '../Entities';
import { ForumDto } from '../dtos';
import * as forumsFixture from '../../fixtures/forums.json';
import { from } from 'rxjs';

@Injectable()
export class ForumService {
  constructor(@InjectInMemoryDBService('forum') private readonly forumEntityService: InMemoryDBService<ForumEntity>) {}
}
