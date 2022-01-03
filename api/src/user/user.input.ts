import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UserInput {

  @Field(() => String,{nullable:true})
  readonly first_name: string;

  @Field(() => String)
  readonly last_name: string;

  @Field(() => Number,{nullable:true})
  readonly mobile_no: number;

  @Field(() => String,{nullable:true})
  readonly email: string;

  @Field(() => Number,{nullable:true})
  readonly status_code: number;

  @Field(() => String,{nullable:true})
  readonly verification_code: string;

  @Field(() => String, { nullable: true })
  readonly passwordHash: string;
}
