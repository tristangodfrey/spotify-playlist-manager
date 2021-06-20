import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {CardType} from "./models/card-type.model";
import {Model} from "mongoose";
import {Validator, ValidatorResult} from "jsonschema";

@Injectable()
export class CardTypeService {

    private validator = new Validator();

    constructor(@InjectModel(CardType.name) private readonly cardTypeModel: Model<CardType>) {
    }

    async validateCardData(data: string, kind: string): Promise<ValidatorResult> {
        //find card type by kind
        const cardType = await this.cardTypeModel.findOne({name: kind}).exec();

        const schema = JSON.parse(cardType.schema);
        const instance = JSON.parse(data);

        return this.validator.validate(instance, schema);
    }

}
