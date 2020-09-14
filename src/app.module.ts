import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TimeoutInterceptor } from './common';
import { AppController } from './app.controller';
import configuration from './config/app.config';
import { UserModule, MessageModule, ForumModule } from './modules';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // GraphQLModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     installSubscriptionHandlers: true,
    //     autoSchemaFile: join(process.cwd(), configService.get<string>('graphql.autoSchemaFilePath')),
    //   }),
    //   inject: [ConfigService],
    // }),
    InMemoryDBModule,
    UserModule, 
    MessageModule, 
    ForumModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    ConfigService
  ],
})
export class AppModule {}
