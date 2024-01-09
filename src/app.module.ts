import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'commons/config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config().database.host,
      port: config().database.port,
      username: config().database.username,
      password: config().database.password,
      database: config().database.database,
      entities: [],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
