import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Card, CardSchema} from "./models/card.model";
import {SpotifyPlaylistCard, SpotifyPlaylistCardSchema} from "./models/cards/spotify-playlist.card";
import {BoardCard, BoardCardSchema} from "../core/models/board.card";
import { CardsService } from './cards.service';
import {CardsResolver} from "./cards.resolver";
import {CardTypeModule} from "../card-type/card-type.module";

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: Card.name,
            schema: CardSchema,
            discriminators: [
                { name: SpotifyPlaylistCard.name, schema: SpotifyPlaylistCardSchema },
                { name: BoardCard.name, schema: BoardCardSchema },
            ]
        }
    ]), CardTypeModule],
    providers: [CardsService, CardsResolver]
})
export class CardsModule {}
