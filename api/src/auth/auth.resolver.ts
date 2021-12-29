import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { appComparePasswords, appHashPassword } from 'src/crypto/crypto.util';
import { MailService } from 'src/mail/mail.service';
import { UserDto } from 'src/user/dto/user.dto';
import { UserInput } from 'src/user/user.input';
import { UserService } from 'src/user/user.service';
import { v4 as uuid } from 'uuid';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/user/schema/user.schema';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { SigninDto } from 'src/user/dto/signin.dto';
import { SignInInput } from 'src/user/signin.input';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly userService: UserService,private mailService: MailService,private readonly authService: AuthService) {}

  /**
  * Get All Users Info. 
  * @return users information.
  */
  @UseGuards(GqlAuthGuard)
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
      if (result.Status === 200) {
        return true;
      } else {
        return false;
      }
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
    return data;
  }

  /**
  * Get User By ID 
  * @param id user ID
  * @return user information.
  */
  @UseGuards(GqlAuthGuard)
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
    return await this.userService.setUserPassword(email,status,passwordHash);
  }

  /**
  * User Sign In
  * @param signinInput
  * @return user Information and access token
  */
  @Query(() => SigninDto, { name: 'Login' })
  async Login(@Args('signinInput') signinInput: SignInInput) : Promise<SigninDto>{
    const user = (await this.userService.findByEmail(signinInput.email)) as User;
    const result = await appComparePasswords(signinInput.passwordHash, user.passwordHash);
    if(result === true){
      const accessToken = await this.authService.getUserAccessToken(user);
      return { user, accessToken } as SigninDto;
    }else{
      const accessToken = '';
      return { user, accessToken } as SigninDto;
    }
  }

  /**
  * Delete User
  * @param id
  * @return user Information 
  */
  @Mutation(() => UserDto, { name: 'DeleteUser' })
  async DeleteUser(@Args('id') id: string) : Promise<UserDto>{
    const user = await this.userService.deleteUser(id);
    return user;
  }

  /**
  * Update User
  * @param id
  * @return user Information 
  */
  @Mutation(() => UserDto, { name: 'UpdateUser' })
  async UpdateUser(@Args('id') id: string,@Args('input') input: UserInput) : Promise<UserDto>{
    const user = await this.userService.updateUser(id,input);
    return user;
  }

  /**
  * Send Forgot Password Request 
  * @param email
  * @return Boolean 
  */
  @Query(() => Boolean, { name: 'SendForgotPasswordRequest' })
  async ForgotPasswordRequset(@Args('email', { type: () => String }) email: string) {
    const data = await this.checkIfEmailExists(email);
    if (data) {
      const verification_code = uuid();
      const result = await this.mailService.sendForgotPasswordLink(email, verification_code);
      if (result.Status === 200) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  /**
  * Send Reset Password Request 
  * @param email
  * @return Boolean 
  */
  @Query(() => Boolean, { name: 'SendResetPasswordRequest' })
  async ResetPasswordRequest(@Args('email', { type: () => String }) email: string) {
    const data = await this.checkIfEmailExists(email);
    if (data) {
        const verification_code = uuid();
        const result = await this.mailService.sendResetPasswordLink(email, verification_code);
        if (result.Status === 200) {
          return true;
        } else {
          return false;
        }
    } else {
      return false;
    }
  }

  /**
  * Reset New User Password 
  * @param emailId, newPasswordHash, oldpasswordHash
  * @return Boolean 
  */
  @Mutation(() => Boolean, { name: 'UpdateResetUserPassword' })
  async UpdateResetUserPassword(
    @Args('email', { type: () => String }) email: string,
    @Args('newPasswordHash', { type: () => String }) passwordHash: string,
    @Args('oldpasswordHash', { type: () => String }) oldpasswordHash: string,
  ): Promise<boolean> {
    const user = await this.userService.updateResetUserPassword(email, passwordHash, oldpasswordHash);
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  /**
  * Forgot User Password 
  * @param emailId, newPasswordHash
  * @return Boolean 
  */
  @Mutation(() => Boolean, { name: 'UpdateForgotUserPassword' })
  async UpdateForgotUserPassword(
    @Args('email', { type: () => String }) email: string,
    @Args('newPasswordHash', { type: () => String }) passwordHash: string,
  ): Promise<boolean> {
    const user = await this.userService.updateForgotUserPassword(email, passwordHash);
    if (user) {
      return true;
      } else {
      return false;
    }
  }
}  
