import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class BoardCard {

    kind: string;

    @Prop({ type: String, required: true })
    name: string;

}

export const BoardCardSchema = SchemaFactory.createForClass(BoardCard);