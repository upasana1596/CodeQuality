import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { UserInput } from './user.input';
import { User, UserDocument } from './schema/user.schema';
import { appComparePasswords, appHashPassword } from 'src/crypto/crypto.util';

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
  async create(first_name: string,last_name: string,mobile:number,email:string,verification_code:string): Promise<UserDto> {
    const createdUser = new this.userModel();
    createdUser.status_code = 0;
    createdUser.first_name = first_name;
    createdUser.last_name = last_name;
    createdUser.email = email;
    createdUser.mobile_no = mobile;
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
  async setUserPassword(email:string,status:number,passwordHash:string): Promise<any> {
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

  /**
  * Delete User
  * @param id 
  * @return user information
  */ 
  async deleteUser(id:string): Promise<any> {
    const user = await this.userModel.findOne({ id });
    user.status_code = 2;
    const userInfo = user.save();
    return userInfo;
  }

  /**
  * Update User
  * @param id,userInput
  * @return user information
  */ 
  async updateUser(id:string, first_name: string, last_name: string,email: string, mobile_no: number): Promise<any> {
    const user = await this.userModel.findOne({ id });
    user.first_name = first_name;
    user.last_name = last_name;
    user.mobile_no = mobile_no;
    user.email = email;
    const userInfo = user.save();
    return userInfo;
  }

  /**
  * Reset User Password
  * @param email,passwordHash,oldpasswordHash
  * @return Boolean
  */ 
  async updateResetUserPassword(
    email: string,
    passwordHash: string,
    oldpasswordHash: string,
  ): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      const result = await appComparePasswords(oldpasswordHash, user.passwordHash);
      if (result) {
        const newPassword = await appHashPassword(passwordHash);
        user.passwordHash = newPassword;
        await user.save();
        console.log(user,"updated user")
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  /**
  * Set Forgot User Password
  * @param email,passwordHash,oldpasswordHash
  * @return Boolean
  */ 
  async updateForgotUserPassword(
    email: string,
    passwordHash: string,
  ): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user) {
        const newPassword = await appHashPassword(passwordHash);
        user.passwordHash = newPassword;
        await user.save();
        return true;
    } else {
      return false;
    }
  }
}
