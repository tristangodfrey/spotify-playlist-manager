import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class Card {

    @Field()
    id: string;

    @Field({ nullable: true})
    parent: string;

    @Field()
    kind: string;

    @Field()
    data: string;

}