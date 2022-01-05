import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PasswordResetDetailDocument = PasswordResetDetail & Document;

@Schema()
export class PasswordResetDetail extends Document{
    @Prop()
    email: string;

    @Prop()
    verification_code: string;

    @Prop({required : true, default: () => new Date()})
    createdAt: Date;

    @Prop({required : true, default: () => new Date()})
    updatedAt: Date;

    @Prop({required : true, default: () => new Date()})
    expTime: Date;
}

export const PasswordResetDetailSchema = SchemaFactory.createForClass(PasswordResetDetail);