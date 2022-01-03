import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class SignInInput {
  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  passwordHash: string;
}
