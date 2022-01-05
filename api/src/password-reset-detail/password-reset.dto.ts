import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class PasswordResetDetailDto {

  @Field(() => String,{nullable : true})
  email: string;

  @Field(() => String,{nullable : true})
  verification_code: string;
  
  @Field({nullable : true})
  createdAt: Date;

  @Field({nullable:true})
  updatedAt: Date;
  
  @Field({nullable:true})
  expTime: Date;
  
}