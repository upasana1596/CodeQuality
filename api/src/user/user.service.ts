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

    async findAll(): Promise<UserDto[]> {
      return await this.userModel.find().exec();
    }

    async create(userInput: UserInput): Promise<UserDto> {
        const createdItem = new this.userModel(userInput);
        createdItem.status_code = 0;
        return createdItem.save();
    }

    async findOne(id:string): Promise<UserDto> {
      return await this.userModel.findById(id);
     }

    async findOneByEmail(emailId:string): Promise<any> {
      const email  = emailId;
      const user = await this.userModel.findOne({ email });
      if (user) {
        return true;
       } else { 
        return false;
      }
    }
    async findByEmail(emailId:string): Promise<UserDto> {
      const email  = emailId;
      const user = await this.userModel.findOne({ email });
      return user;
    }
}
