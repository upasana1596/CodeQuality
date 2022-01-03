import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { appComparePasswords } from 'src/crypto/crypto.util';
import { SignInInput } from 'src/user/signin.input';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService:JwtService,private readonly userService:UserService) {}
    
    /**
    * Validate User
    * @param email,password
    * @return user Information or null
    */
    async validateUser(email:string,password:string) : Promise<any>{
        const user = this.userService.findByEmail(email);
        if (user && (await appComparePasswords(password, (await user).passwordHash))) {
          return user;
        }
        return null;
    }
  
    /**
    * Get User Access Token
    * @param SignInInput
    * @return accessToken
    */
    async getUserAccessToken(user: SignInInput){
        const payload = { email: user.email, };
        const accessToken = this.jwtService.sign(payload);
        return accessToken;
    }
  
    /**
    * Verify Access Token
    * @param token
    * @return user information
    */
    async verifyAccessToken(token:string){
        const decodedToken = this.jwtService.verify(token,{
            secret: jwtConstants
        });
        const user = this.userService.findByEmail(decodedToken.email);
        if(!user){
            throw new Error('Unable to get the user from decoded token')
        }
        return user;
    }
}      