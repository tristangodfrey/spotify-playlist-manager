import {Module, OnModuleInit} from '@nestjs/common';
import { CardTypeService } from './card-type.service';
import {InjectModel, MongooseModule} from "@nestjs/mongoose";
import {CardType, CardTypeSchema} from "./models/card-type.model";
import {Model} from "mongoose";

@Module({
  imports: [MongooseModule.forFeature([
    { name: CardType.name, schema: CardTypeSchema}
  ])],
  providers: [CardTypeService],
  exports: [CardTypeService]
})
export class CardTypeModule implements OnModuleInit {

  constructor(@InjectModel(CardType.name) private readonly cardTypeModel: Model<CardType>) {
  }

  async onModuleInit() {

    await this.cardTypeModel.deleteMany({name: 'BoardCard'}).exec();

    await this.cardTypeModel.create({
      name: 'BoardCard',
      schema: JSON.stringify({
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          }
        },
        "required": [
          "name"
        ]
      })
    })
  }

}
