import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User,UserSchema } from './schema/user.schema'
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports:[MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),MailModule],
  providers: [UserResolver, UserService]
})
export class UserModule {}
