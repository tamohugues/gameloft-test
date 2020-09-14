import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
    @Get()
    async findContinent(@Query('id') id: number): Promise<string[]> {
      return [];
    }

}
