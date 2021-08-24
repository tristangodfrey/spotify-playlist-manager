import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Card = {
  __typename?: 'Card';
  id: Scalars['String'];
  parent?: Maybe<Scalars['String']>;
  kind: Scalars['String'];
  data: Scalars['String'];
};

export type CreateCardInput = {
  kind: Scalars['String'];
  parent?: Maybe<Scalars['String']>;
  data: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  create: Card;
};


export type MutationCreateArgs = {
  cardInput: CreateCardInput;
};

export type Query = {
  __typename?: 'Query';
  sayHello: Scalars['String'];
  getCards: Array<Card>;
};
