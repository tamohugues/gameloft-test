import { Injectable } from '@nestjs/common';
import { InjectInMemoryDBService, InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Request } from '../dtos';
import { RequestEntity } from '../Entities';
import { RequestInput, CloseRequestInput } from '../inputs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RequestService {
  private nextId: number = 1;
  constructor(
    @InjectInMemoryDBService('request')
    private readonly requestEntityService: InMemoryDBService<RequestEntity>,
  ) {}

  async create(input: RequestInput): Promise<Request> {
    const entity: RequestEntity = {
      id: `${this.nextId}`,
      adminId: input.adminId,
      senderId: input.senderId,
      forumId: input.forumId,
      isAccepted: input.isAccepted,
      isClosed: input.isClosed,
    };

    this.nextId++;

    return await of(this.requestEntityService.create(entity))
      .pipe(map(async (createdEntity) => await this.formatEntityToDto(createdEntity)))
      .toPromise();
  }

  async close(input: CloseRequestInput): Promise<boolean> {
    const entity = this.requestEntityService.get(`${input.requestId}`);

    entity.isAccepted = input.isAccepted;
    entity.isClosed = true;

    this.requestEntityService.update(entity);
    return of(true).toPromise();
  }

  async getById(id: number): Promise<Request> {
    const entity = this.requestEntityService.get(`${id}`);

    if (!entity) {
      return undefined;
    }

    const dto = await this.formatEntityToDto(entity);
    return of(dto).toPromise();
  }

  async getManyByAdminId(adminId: number): Promise<Request[]> {
    return of(this.requestEntityService.query((entity) => entity.adminId === adminId && !entity.isClosed))
      .pipe(map(async (entities) => await this.formatArrayEntityToDto(entities)))
      .toPromise();
  }

  private async formatArrayEntityToDto(entities: RequestEntity[]): Promise<Request[]> {
    const dtos: Request[] = [];
    entities.forEach(async (entity) => {
      const dto = await this.formatEntityToDto(entity);
      dtos.push(dto);
    });
    return of(dtos).toPromise();
  }

  private async formatEntityToDto(entity: RequestEntity): Promise<Request> {
    const dto = new Request();
    dto.id = +entity.id;
    dto.forumId = entity.forumId;
    dto.senderId = entity.senderId;
    return of(dto).toPromise();
  }
}
