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

    return of(this.messageEntityService.create(entity))
      .pipe(
        map((message) => {
          let dto = new MessageDto();
          dto.date = new Date(message.date);
          dto.text = message.text;
          dto.sender = sender;
          return dto;
        }),
      )
      .toPromise();
  }

  async getById(id: number): Promise<MessageDto> {
    const entity = this.messageEntityService.get(`${id}`);

    if (!entity) {
      return undefined;
    }

    const userDto = await this.userService.getById(entity.senderId);

    let dto = new MessageDto();
    dto.sender = userDto;
    dto.text = entity.text;
    dto.date = new Date(entity.date);
    return of(dto).toPromise();
  }

  async getManyById(ids: number[]): Promise<MessageDto[]> {
    return of(this.messageEntityService.query((message) => ids.indexOf(+message.id) >= 0))
      .pipe(map((entities) => this.formatEntityToDto(entities)))
      .toPromise();
  }

  async getByForumId(forumId: number): Promise<MessageDto[]> {
    return of(this.messageEntityService.query((message) => message.forumId === forumId))
      .pipe(map((entities) => this.formatEntityToDto(entities)))
      .toPromise();
  }

  private initMessagesFixture() {
    messagesFixture.forEach(async (message) => {
      if (!(await this.getById(message.id))) {
        await this.create(message);
      }
    });
  }

  private formatEntityToDto(entities: MessageEntity[]): MessageDto[] {
    const dtos: MessageDto[] = [];
    entities
      .sort((a: MessageEntity, b: MessageEntity) => {
        return b.date - a.date;
      })
      .forEach(async (entity) => {
        const messageDto = new MessageDto();
        messageDto.date = new Date(entity.date);
        messageDto.sender = await this.userService.getById(entity.senderId);
        messageDto.text = entity.text;
        dtos.push(messageDto);
      });
    return dtos;
  }
}
