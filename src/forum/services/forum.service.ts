import { Injectable } from '@nestjs/common';
import { InjectInMemoryDBService, InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { ForumEntity } from '../Entities';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { ForumDto } from '../dtos';
import * as forumsFixture from '../../fixtures/forums.json';
import { ForumInput } from '../inputs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ForumService {
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    @InjectInMemoryDBService('forum')
    private readonly forumEntityService: InMemoryDBService<ForumEntity>,
  ) {
    this.initForumsFixture();
  }

  async getById(id: number): Promise<ForumDto> {
    const entity = this.forumEntityService.get(`${id}`);

    if (!entity) {
      return undefined;
    }

    const dto = await this.formatEntityToDto(entity);
    return of(dto).toPromise();
  }

  async create(input: ForumInput): Promise<ForumDto> {
    const entity = {
      name: input.name,
      members: input.members,
    };

    if (input.id) {
      entity['id'] = `${input.id}`;
    }

    return await of(this.forumEntityService.create(entity))
      .pipe(map(async (createdEntity) => await this.formatEntityToDto(createdEntity)))
      .toPromise();
  }

  private initForumsFixture() {
    forumsFixture.forEach(async (fixture) => {
      if (!(await this.getById(fixture.id))) {
        await this.create(fixture);
      }
    });
  }

  private async formatArrayEntityToDto(entities: ForumEntity[]): Promise<ForumDto[]> {
    const dtos: ForumDto[] = [];
    entities.forEach(async (entity) => {
      const dto = await this.formatEntityToDto(entity);
      dtos.push(dto);
    });
    return of(dtos).toPromise();
  }

  private async formatEntityToDto(entity: ForumEntity): Promise<ForumDto> {
    const dto = new ForumDto();
    dto.id = +entity.id;
    dto.name = entity.name;
    dto.members = await this.userService.getManyById(entity.members);
    dto.messages = await this.messageService.getByForumId(dto.id);
    return of(dto).toPromise();
  }
}
