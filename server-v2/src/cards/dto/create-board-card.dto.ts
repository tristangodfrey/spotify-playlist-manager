import {Field, InputType} from "@nestjs/graphql";
import CreateCardInput from "./create-card.dto";


@InputType()
export class CreateBoardCard extends CreateCardInput {

    @Field()
    name: string;


}