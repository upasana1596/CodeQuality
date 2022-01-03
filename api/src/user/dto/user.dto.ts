import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
  @Field(() => ID)
  id?: string;

  @Field(() => String,{nullable : true})
  first_name: string;
  
  @Field(() => String,{nullable : true})
  last_name: string;

  @Field(() => String,{nullable : true})
  email: string;

  @Field(() => Number,{nullable : true})
  mobile_no: number;

  @Field(() => String,{nullable : true})
  verification_code: string;

  @Field(() => Number,{nullable : true})
  status_code: number;

  @Field(() => String, { nullable: true })
  passwordHash: string;
  
  @Field({nullable : true})
  createdAt: Date;

  @Field({nullable:true})
  updatedAt: Date;
  
}