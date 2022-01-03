import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { LocalStrategy } from 'src/strategies/local.startegy';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: jwtConstants,
        signOptions: { expiresIn: '5000s' }, // TODO: Move this out to a configuration where it can be reported to the client
      }),
    }),
    PassportModule,
  ],
  providers:[AuthService,JwtStrategy,LocalStrategy,AuthResolver]
})
export class AuthModule {}
