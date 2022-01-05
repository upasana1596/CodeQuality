import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PasswordResetDetailDto } from './password-reset.dto';
import { PasswordResetDetail, PasswordResetDetailDocument } from './schema/password-detail.schema';

@Injectable()
export class PasswordResetDetailService {
    constructor(@InjectModel(PasswordResetDetail.name) private passwordresetModel: Model<PasswordResetDetailDocument>) {}
    
    /**
     * Find Password Reset Details. 
     * @return passord reset information.
     */
    async findAll(): Promise<PasswordResetDetailDto[]> {
        return await this.passwordresetModel.find().exec();
    }
    /**
     * Add Password Reset Details. 
     * @return passord reset information.
     */
    async create(email: string,verification_code:string): Promise<PasswordResetDetailDto> {
        const passwordResetDetail = new this.passwordresetModel();
        passwordResetDetail.verification_code = verification_code;
        passwordResetDetail.expTime = new Date();
        passwordResetDetail.email = email;
        const passwordReset =  passwordResetDetail.save();
        return passwordReset;
      }
}
