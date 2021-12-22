import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserInput } from './user.input';
import { MailService } from 'src/mail/mail.service';
import { v4 as uuid } from 'uuid';
import { appHashPassword } from 'src/crypto/crypto.util';

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService,private mailService: MailService) {}

    /**
    * Get All Users Info. 
    * @return users information.
    */
    @Query(() => [UserDto], { name: 'GetAllUsers' })
    async getAllUsers() {
        return this.userService.findAll();
    }
    
    /**
    * User Sign Up 
    * @param object user dto
    * @return user information.
    */
    @Mutation(() => Boolean, { name: 'SignUp' })
    async signUp(@Args('input') input: UserInput) {
      const email = await this.checkIfEmailExists(input.email);
      const verification_code = uuid();
      if(!email){
        const result = await this.SendEmail(input.email,verification_code);
        await this.userService.create(input,verification_code);
      }else{
        return false;
      }
    }

    /**
    * Check if email exists
    * @param email user email
    * @return boolean.
    */
    @Query(() => Boolean, { name: 'checkIfEmailExists' })
    async checkIfEmailExists( @Args('emailId') emailId: string) : Promise<boolean> {
       return this.userService.findOneByEmail(emailId);
    }
    /**
    * Send email to user for verification
    * @param emailId user email
    * @return boolean.
    */
    @Mutation(() => UserDto, { name: 'SendEmail' })
    async SendEmail(@Args('emailId') emailId: string,@Args('verification_code') verification_code: string){
      const data = await this.mailService.sendUserConfirmation(emailId,verification_code);
      console.log(data,"data")
      return data;
    }

    /**
    * Get User By ID 
    * @param id user ID
    * @return user information.
    */
    @Query(() => UserDto, { name: 'GetUserByID' })
    async getUserById( @Args('id') id: string) {
      return this.userService.findOne(id);
    }

    /**
    * Verify verifcation code
    * @param email,verificationCode
    * @return Boolean
    */
    @Query(() => Boolean, { name: 'verifyAuthCode' })
    async verifyAuthCode(
      @Args('email') email: string,
      @Args('verificationCode') verificationCode: string,
    ) {
      const user = await this.userService.findByEmail(email);
      if (user) {
        if (user.status_code === 1 && verificationCode === user.verification_code) {
          return false;
        } else {
          if (user.status_code !== 0) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
    
    /**
    * Complete User Account
    * @param email,status,password
    * @return Boolean
    */
     @Mutation(() => Boolean, { name: 'CompleteUserAccountProcess' })
     async CompleteUserAccountProcess(
       @Args('email') email: string,
       @Args('status') status: number,
       @Args('password') password: string) {
      const passwordHash = await appHashPassword(password);
      return await this.userService.updateUserPassword(email,status,passwordHash);
     }
}
