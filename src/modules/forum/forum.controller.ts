import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Forum')
@Controller('forum')
export class ForumController {

    @Get()
    async findContinent(@Query('id') id: number): Promise<string[]> {
      return [];
    }

}
