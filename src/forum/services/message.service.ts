import { Inject, Injectable } from '@nestjs/common';
import { InjectInMemoryDBService, InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { MessageEntity } from '../Entities';
import { MessageDto } from '../dtos';
import { MessageInput } from '../inputs';
import { UserService } from '../services/user.service';
import * as messagesFixture from '../../fixtures/messages.json';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MessageService {
  constructor(
    private readonly userService: UserService,
    @InjectInMemoryDBService('message')
    private readonly messageEntityService: InMemoryDBService<MessageEntity>,
  ) {
    this.initMessagesFixture();
  }

  async create(input: MessageInput): Promise<MessageDto> {
    const sender = await this.userService.getById(input.senderId);

    if (!sender) {
      throw new Error('User Id not found');
    }

    const entity = {
      text: input.text,
      senderId: input.senderId,
      forumId: input.forumId,
      date: input.date ?? new Date().getTime(),
    };

    if (input.id) {
      entity['id'] = `${input.id}`;
    }

    return await of(this.messageEntityService.create(entity))
      .pipe(map(async (createdEntity) => await this.formatEntityToDto(createdEntity)))
      .toPromise();
  }

  async getById(id: number): Promise<MessageDto> {
    const entity = this.messageEntityService.get(`${id}`);

    if (!entity) {
      return undefined;
    }

    const dto = await this.formatEntityToDto(entity);
    return of(dto).toPromise();
  }

  async getManyById(ids: number[]): Promise<MessageDto[]> {
    return of(this.messageEntityService.query((message) => ids.indexOf(+message.id) >= 0))
      .pipe(map((entities) => this.formatArrayEntityToDto(entities)))
      .toPromise();
  }

  async getByForumId(forumId: number): Promise<MessageDto[]> {
    return of(this.messageEntityService.query((message) => message.forumId === forumId))
      .pipe(map((entities) => this.formatArrayEntityToDto(entities)))
      .toPromise();
  }

  private initMessagesFixture() {
    messagesFixture.forEach(async (fixture) => {
      if (!(await this.getById(fixture.id))) {
        await this.create(fixture);
      }
    });
  }

  private async formatArrayEntityToDto(entities: MessageEntity[]): Promise<MessageDto[]> {
    const dtos: MessageDto[] = [];
    entities
      .sort((a: MessageEntity, b: MessageEntity) => {
        return b.date - a.date;
      })
      .forEach(async (entity) => {
        const dto = await this.formatEntityToDto(entity);
        dtos.push(dto);
      });
    return of(dtos).toPromise();
  }

  private async formatEntityToDto(entity: MessageEntity): Promise<MessageDto> {
    const dto = new MessageDto();
    dto.date = new Date(entity.date);
    dto.sender = await this.userService.getById(entity.senderId);
    dto.text = entity.text;
    return of(dto).toPromise();
  }
}
