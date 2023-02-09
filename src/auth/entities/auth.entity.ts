import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  constructor(access_token: string) {
    this.access_token = access_token;
  }

  @Field()
  access_token: string;
}
