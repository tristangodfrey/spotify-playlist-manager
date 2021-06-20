import {Field, InputType} from "@nestjs/graphql";


@InputType()
export default class CreateCardInput {

    @Field()
    kind: string;

    @Field({ nullable: true})
    parent: string;

    @Field()
    data: string;

}