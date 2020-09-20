import { Injectable } from '@nestjs/common';
import { InjectInMemoryDBService, InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { User } from '../dtos';
import { UserEntity } from '../Entities';
import * as usersFixture from '../../fixtures/users.json';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserInput } from '../inputs';

@Injectable()
export class UserService {
  constructor(
    @InjectInMemoryDBService('user')
    private readonly userEntityService: InMemoryDBService<UserEntity>,
  ) {
    this.initFixture();
  }

  public async getById(id: number): Promise<User> {
    const entity = this.userEntityService.get(`${id}`);
    if (!entity) {
      return undefined;
    }
    return of(this.formatEntityToDto(entity)).toPromise();
  }

  async getManyById(ids: number[]): Promise<User[]> {
    return of(this.userEntityService.query((user) => ids.indexOf(+user.id) >= 0))
      .pipe(
        map((users) => users.map<User>((entity) => this.formatEntityToDto(entity))),
      )
      .toPromise();
  }

  async getAll(): Promise<User[]> {
    return of(this.userEntityService.getAll())
      .pipe(
        map((users) => users.map<User>((entity) => this.formatEntityToDto(entity))),
      )
      .toPromise();
  }

  async initFixture() {
    usersFixture.forEach(async (user) => {
      if (!(await this.getById(user.id))) {
        this.userEntityService.create({ ...user, id: `${user.id}` });
      }
    });
  }

  private formatEntityToDto(entity: UserEntity): User {
    const dto = new User();
    dto.id = +entity.id;
    dto.name = entity.name;
    dto.picture = entity.picture;
    return dto;
  }
}
