import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import {CardsService} from "./cards.service";
import {Card} from "./dto/card.dto";
import CreateCardInput from "./dto/create-card.dto";
import {CreateBoardCard} from "./dto/create-board-card.dto";

const pubSub = new PubSub();

@Resolver('Card')
export class CardsResolver {
    constructor(private readonly cardsService: CardsService) {}

    @Query(returns => [Card])
    async getCards() {
        return this.cardsService.getCards();
    }

    // @Query('cat')
    // async findOneById(
    //     @Args('id', ParseIntPipe)
    //         id: number,
    // ): Promise<Cat> {
    //     return this.catsService.findOneById(id);
    // }
    //
    @Mutation(returns => Card)
    async create(@Args({ name: 'cardInput', type: () => CreateCardInput}) args: CreateCardInput): Promise<Card> {
        const card = await this.cardsService.create(args);

        console.log('card created:');
        console.log(card);

        const res = {
            kind: card.kind,
            id: card['_id'],
            parent: card.parent,
            data: card.data
        }

        return res;
    }
    //
    // @Subscription('catCreated')
    // catCreated() {
    //     return pubSub.asyncIterator('catCreated');
    // }
}