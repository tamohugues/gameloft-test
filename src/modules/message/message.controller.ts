import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Message')
@Controller('message')
export class MessageController {
    @Get()
    async findContinent(@Query('id') id: number): Promise<string[]> {
      return [];
    }

}
