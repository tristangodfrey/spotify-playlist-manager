import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {SpotifyCard} from "../../../dist/cards/models/spotify-card.model";
import {BoardCard} from "../../core/models/board.card";


@Schema()
export class Card {

    @Prop()
    kind: string;

    @Prop()
    parent: string;

    @Prop()
    data: string;

}

export const CardSchema = SchemaFactory.createForClass(Card);