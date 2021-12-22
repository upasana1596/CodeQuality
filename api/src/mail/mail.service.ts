import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
const emailSubject = ' Please Verify your Email Address';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendUserConfirmation(emailId: string) {  
      await this.mailerService
      .sendMail({
        from: "<upasna@appsvolt.com>",
        to: emailId,
        subject: emailSubject,
        text: 'Hello world ',
        template: './confirmation', 
        context: { 
           name: "upasana",
           url:'',
        },
      })
      .then(() => {})
      .catch(() => {});
    }
}
