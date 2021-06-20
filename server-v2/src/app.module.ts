import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GraphQLModule} from "@nestjs/graphql";
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';
import {AppResolver} from "./app.resolver";
import { CardsModule } from './cards/cards.module';
import {MongooseModule} from "@nestjs/mongoose";
import { CoreModule } from './core/core.module';
import { SpotifyModule } from './spotify/spotify.module';
import { CardTypeModule } from './card-type/card-type.module';

@Module({
  imports: [GraphQLModule.forRoot({
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    playground: true
      }
  ),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../..', 'app/dist'),
    exclude: ['/graphql']
  }),
    CardsModule,
    CoreModule,
    SpotifyModule,
    CardTypeModule
    ,],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
