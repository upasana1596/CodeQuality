import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User extends Document{
    
    @Prop()
    first_name: string;

    @Prop()
    mobile_no: number;

    @Prop()
    last_name: string;

    @Prop()
    email: string;

    @Prop()
    status_code: number;

    @Prop()
    verification_code: string;

    @Prop({required : true, default: () => new Date()})
    createdAt: Date;

    @Prop({required : true, default: () => new Date()})
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);