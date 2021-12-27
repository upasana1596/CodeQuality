import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/schema/user.schema';
import { UserDto } from './user.dto';

@ObjectType()
export class SigninDto {
  @Field(() => String)
  accessToken: string;
  @Field(() => UserDto)
  user: UserDto;
}
