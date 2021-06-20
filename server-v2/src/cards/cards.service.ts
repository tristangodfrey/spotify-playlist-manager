import { Injectable } from '@nestjs/common';
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import {Connection, Model} from "mongoose";
import {Card} from "./models/card.model";
import CreateCardInput from "./dto/create-card.dto";
import {CardTypeService} from "../card-type/card-type.service";

@Injectable()
export class CardsService {

    constructor(@InjectModel(Card.name) private readonly cardModel: Model<Card>, private readonly cardTypeService: CardTypeService) {
    }

    async getCards() {
        const cards = await this.cardModel.find().exec();

        return cards;
    }

    async create(input: CreateCardInput): Promise<Card> {

        const res = await this.cardTypeService.validateCardData(input.data, input.kind);

        if (res.valid) {
            console.log('we valid!');
        } else {
            console.log('data invalid :(');
        }

        return await this.cardModel.create(input);
    }

}
