import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordResetDetailResolver } from './password-reset-detail.resolver';
import { PasswordResetDetailService } from './password-reset-detail.service';
import { PasswordResetDetail, PasswordResetDetailSchema } from './schema/password-detail.schema';

@Module({
    imports:[
        MongooseModule.forFeature([{ name: PasswordResetDetail.name, schema: PasswordResetDetailSchema }]),
    ],
    exports:[PasswordResetDetailService],
    providers: [PasswordResetDetailService,PasswordResetDetailResolver],
})
export class PasswordResetDetailModule {}
