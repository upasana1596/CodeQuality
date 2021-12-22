import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UserInput {

  @Field(() => String)
  readonly first_name: string;

  @Field(() => String)
  readonly last_name: string;

  @Field(() => Number)
  readonly mobile_no: number;

  @Field(() => String)
  readonly email: string;

  @Field(() => Number,{nullable:true})
  readonly status: number;

  @Field(() => String,{nullable:true})
  readonly verification_code: string;
}
