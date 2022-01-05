import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { PasswordResetDetailModule } from './password-reset-detail/password-reset-detail.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true
    }),
    MongooseModule.forRoot('mongodb://localhost/demo'), 
    UserModule, MailModule, AuthModule, PasswordResetDetailModule,PasswordResetDetailModule],
  providers: [AppService],
})
export class AppModule {}
