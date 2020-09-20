import { Injectable } from '@nestjs/common';
import { InjectInMemoryDBService, InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { ForumEntity } from '../Entities';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { Forum } from '../dtos';
import * as forumsFixture from '../../fixtures/forums.json';
import { ForumInput } from '../inputs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ForumService {
  private nextId: number = 0;

  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    @InjectInMemoryDBService('forum')
    private readonly forumEntityService: InMemoryDBService<ForumEntity>,
  ) {
    this.initFixture();
  }

  async getById(id: number): Promise<Forum> {
    const entity = this.forumEntityService.get(`${id}`);

    if (!entity) {
      return undefined;
    }

    const dto = await this.formatEntityToDto(entity);
    return of(dto).toPromise();
  }

  async create(input: ForumInput): Promise<Forum> {
    const entity = {
      name: input.name,
      members: input.members,
    };

    if (input.id) {
      this.nextId = input.id;
      entity['id'] = `${input.id}`;
    } else {
      this.nextId++;
      entity['id'] = `${this.nextId}`;
    }

    return await of(this.forumEntityService.create(entity))
      .pipe(map(async (createdEntity) => await this.formatEntityToDto(createdEntity)))
      .toPromise();
  }

  async join(forumId: number, userId: number): Promise<boolean> {
    const entity = this.forumEntityService.get(`${forumId}`);

    if (entity.members.indexOf(userId) >= 0) {
      return false;
    }

    entity.members.push(userId);
    this.forumEntityService.update(entity);

    return true;
  }

  async getAvailable(userId: number): Promise<Forum[]> {
    return await of(this.forumEntityService.query((entity) => entity.members.indexOf(userId) < 0))
      .pipe(map(async (entities) => await this.formatArrayEntityToDto(entities)))
      .toPromise();
  }

  async getJoined(userId: number): Promise<Forum[]> {
    return await of(this.forumEntityService.query((entity) => entity.members.indexOf(userId) >= 0))
      .pipe(map(async (entities) => await this.formatArrayEntityToDto(entities)))
      .toPromise();
  }

  private initFixture() {
    forumsFixture.forEach(async (fixture) => {
      if (!(await this.getById(fixture.id))) {
        await this.create(fixture);
      }
    });
  }

  private async formatArrayEntityToDto(entities: ForumEntity[]): Promise<Forum[]> {
    const dtos: Forum[] = [];
    entities.forEach(async (entity) => {
      const dto = await this.formatEntityToDto(entity);
      dtos.push(dto);
    });
    return of(dtos).toPromise();
  }

  private async formatEntityToDto(entity: ForumEntity): Promise<Forum> {
    const dto = new Forum();
    dto.id = +entity.id;
    dto.name = entity.name;
    dto.members = await this.userService.getManyById(entity.members);
    dto.messages = await this.messageService.getByForumId(dto.id);
    return of(dto).toPromise();
  }
}
