"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyStrategy = void 0;
const passport_spotify_1 = require("passport-spotify");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
let SpotifyStrategy = class SpotifyStrategy extends passport_1.PassportStrategy(passport_spotify_1.Strategy) {
    constructor() {
        super({
            clientID: 'c8c47738b8b84cb3b2b7be4fc759ebf7',
            clientSecret: '7687dc7a68124101be3d6959a56f522a',
            callbackURL: 'http://localhost:8080/auth/spotify/callback'
        });
    }
    async validate(payload) {
        console.log(payload);
        return payload;
    }
};
SpotifyStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], SpotifyStrategy);
exports.SpotifyStrategy = SpotifyStrategy;
//# sourceMappingURL=spotify.strategy.js.map