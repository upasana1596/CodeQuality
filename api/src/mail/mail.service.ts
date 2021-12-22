import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendUserConfirmation(emailId: string,verification_code:string) {  
      const emailSubject = ' Please Verify your Email Address';
      const Url = `http://localhost:3000/confirm-email/${emailId}/${verification_code}`;

      await this.mailerService
      .sendMail({
        from: "<upasna@appsvolt.com>",
        to: emailId,
        subject: emailSubject,
        template: './confirmation', 
        context: { 
           url:Url,
        },
      })
      .then(() => {
      })
      .catch(() => {
      });
    }
}
