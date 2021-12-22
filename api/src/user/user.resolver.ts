import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserInput } from './user.input';
import { MailService } from 'src/mail/mail.service';

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService,private mailService: MailService) {}
    /**
    * User Sign Up 
    * @param object user dto
    * @return user information.
    */
    @Mutation(() => Boolean, { name: 'SignUp' })
    async signUp(@Args('input') input: UserInput) {
      const email = await this.checkIfEmailExists(input.email);
      if(!email){
        const result = await this.SendEmail(input.email);
        await this.userService.create(input);
      }else{
        return false;
      }
    }

    /**

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
    async SendEmail(@Args('emailId') emailId: string){
      return this.mailService.sendUserConfirmation(emailId);
    }
}
