import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [AuthModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'app/dist'),
    renderPath: "/app",
    serveRoot: "/app"
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
