import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectInMemoryDBService, InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { MessageEntity } from '../Entities';
import { Message } from '../dtos';
import { MessageInput } from '../inputs';
import { UserService } from '../services/user.service';
import * as messagesFixture from '../../fixtures/messages.json';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MessageService {
  private nextId: number = 0;

  constructor(
    private readonly userService: UserService,
    @InjectInMemoryDBService('message')
    private readonly messageEntityService: InMemoryDBService<MessageEntity>,
  ) {
    this.initFixture();
  }

  async create(input: MessageInput): Promise<Message> {
    const entity = {
      text: input.text,
      senderId: input.senderId,
      forumId: input.forumId,
      date: input.date ?? new Date().getTime(),
    };

    if (input.id) {
      this.nextId = input.id;
      entity['id'] = `${input.id}`;
    } else {
      this.nextId++;
      entity['id'] = `${this.nextId}`;
    }

    return await of(this.messageEntityService.create(entity))
      .pipe(map(async (createdEntity) => await this.formatEntityToDto(createdEntity)))
      .toPromise();
  }

  async getById(id: number): Promise<Message> {
    const entity = this.messageEntityService.get(`${id}`);

    if (!entity) {
      return undefined;
    }

    const dto = await this.formatEntityToDto(entity);
    return of(dto).toPromise();
  }

  async getManyById(ids: number[]): Promise<Message[]> {
    return of(this.messageEntityService.query((message) => ids.indexOf(+message.id) >= 0))
      .pipe(map((entities) => this.formatArrayEntityToDto(entities)))
      .toPromise();
  }

  async getByForumId(forumId: number): Promise<Message[]> {
    return of(this.messageEntityService.query((message) => message.forumId === forumId))
      .pipe(map((entities) => this.formatArrayEntityToDto(entities)))
      .toPromise();
  }

  private initFixture() {
    messagesFixture.forEach(async (fixture) => {
      if (!(await this.getById(fixture.id))) {
        await this.create(fixture);
      }
    });
  }

  private async formatArrayEntityToDto(entities: MessageEntity[]): Promise<Message[]> {
    const dtos: Message[] = [];
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

  private async formatEntityToDto(entity: MessageEntity): Promise<Message> {
    const dto = new Message();
    dto.id = +entity.id;
    dto.date = new Date(entity.date);
    dto.sender = await this.userService.getById(entity.senderId);
    dto.text = entity.text;
    return of(dto).toPromise();
  }
}
