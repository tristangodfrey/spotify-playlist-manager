import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class SpotifyPlaylistCard {

    kind: string;

    @Prop({ type: String, required: true })
    url: string;

}

export const SpotifyPlaylistCardSchema = SchemaFactory.createForClass(SpotifyPlaylistCard);