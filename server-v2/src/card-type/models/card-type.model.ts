import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";


@Schema()
export class CardType {
    @Prop()
    id: string;

    @Prop()
    name: string;

    @Prop()
    schema: string;

}

export const CardTypeSchema = SchemaFactory.createForClass(CardType);