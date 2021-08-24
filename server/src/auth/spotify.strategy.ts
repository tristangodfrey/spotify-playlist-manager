import { Strategy } from 'passport-spotify';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            clientID: 'c8c47738b8b84cb3b2b7be4fc759ebf7',
            clientSecret: '7687dc7a68124101be3d6959a56f522a',
            callbackURL: 'http://localhost:8080/auth/spotify/callback'
        });
    }

    async validate(payload: any) {
        console.log(payload);
        return payload;
    }
}
