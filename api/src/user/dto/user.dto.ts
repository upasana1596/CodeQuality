import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
  @Field(() => ID)
  id?: string;

  @Field(() => String)
  first_name: string;
  
  @Field(() => String)
  last_name: string;

  @Field(() => String)
  email: string;

  @Field(() => Number)
  mobile_no: number;

  @Field(() => String,{nullable : true})
  verification_code: string;

  @Field(() => Number,{nullable : true})
  status_code: number;
  
  @Field({nullable : true})
  createdAt: Date;

  @Field({nullable:true})
  updatedAt: Date;
}