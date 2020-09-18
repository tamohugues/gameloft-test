import { Injectable } from '@nestjs/common';
import { InjectInMemoryDBService, InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { ForumEntity } from '../Entities';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { ForumDto } from '../dtos';
import * as forumsFixture from '../../fixtures/forums.json';
import { of } from 'rxjs';
import { ForumInput } from '../inputs';

@Injectable()
export class ForumService {
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    @InjectInMemoryDBService('forum')
    private readonly forumEntityService: InMemoryDBService<ForumEntity>,
  ) {}

  async getById(id: number): Promise<ForumDto> {
    const entity = this.forumEntityService.get(`${id}`);

    if (!entity) {
      return undefined;
    }

    const dto = await this.formatEntityToDto(entity);
    return of(dto).toPromise();
  }

  create(input: ForumInput): Promise<ForumDto> {
    return null;
  }

  private initForumsFixture() {
    forumsFixture.forEach((forum) => {});
  }

  private formatArrayEntityToDto(entities: ForumEntity[]): ForumDto[] {
    const dtos: ForumDto[] = [];
    entities.forEach(async (entity) => {
      const dto = await this.formatEntityToDto(entity);
      dtos.push(dto);
    });
    return dtos;
  }

  private async formatEntityToDto(entity: ForumEntity): Promise<ForumDto> {
    const dto = new ForumDto();
    dto.id = +entity.id;
    dto.name = entity.name;
    dto.members = await this.userService.getManyById(entity.members);
    dto.messages = await this.messageService.getByForumId(dto.id);
    return dto;
  }
}
