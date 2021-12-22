import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { UserInput } from './user.input';
import { User, UserDocument } from './schema/user.schema';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    /**
    * Find All Users Info. 
    * @return users information.
    */
    async findAll(): Promise<UserDto[]> {
      return await this.userModel.find().exec();
    }

    /**
    * Sign Up User
    * @param UserInput,verification_code 
    * @return users information.
    */
    async create(userInput: UserInput,verification_code:string): Promise<UserDto> {
        const createdUser = new this.userModel(userInput);
        createdUser.status_code = 0;
        createdUser.verification_code = verification_code;
        return createdUser.save();
    }
    /**
    * Find User By ID
    * @param id 
    * @return users information.
    */
    async findOne(id:string): Promise<UserDto> {
      return await this.userModel.findById(id);
     }

    /**
    * Find One User By Email
    * @param emailId 
    * @return Boolean.
    */ 
    async findOneByEmail(emailId:string): Promise<any> {
      const email  = emailId;
      const user = await this.userModel.findOne({ email });
      if (user) {
        return true;
       } else { 
        return false;
      }
    }

    /**
    * Find One User By Email
    * @param emailId 
    * @return User Information.
    */ 
    async findByEmail(emailId:string): Promise<UserDto> {
      const email  = emailId;
      const user = await this.userModel.findOne({ email });
      return user;
    }

    /**
    * Set User Password
    * @param email,status,passwordHash 
    * @return Boolean
    */ 
    async updateUserPassword(email:string,status:number,passwordHash:string): Promise<any> {
      const createdUser = await this.userModel.findOne({ email });
      createdUser.passwordHash = passwordHash;
      createdUser.status_code = status;
      const updatePassword = createdUser.save();
      if(updatePassword){
        return true;
      }else{
        return false;
      }
    }
}
