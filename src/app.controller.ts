import {Controller, Get, Redirect, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import {AuthGuard} from "@nestjs/passport";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('spotify'))
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("auth/spotify/callback")
  @UseGuards(AuthGuard('spotify'))
  @Redirect()
  spotifyCallback(@Request() req) {

    console.log("Spotify callback");
    console.log(req.user);

    return {
      url: `/app?token=${req.user}`,
    }
  }
}
