import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    /**
    * Send User Verification Email 
    * @param email,verification_code
    * @return status 
    */
    async sendUserConfirmation(emailId: string,verification_code:string) {  
      const emailSubject = 'Please Verify your Email Address';
      const url = `http://localhost:4200/confirm-email/${emailId}/${verification_code}`;
      const emailBody = `To verify your email address and finish creating your account, please click the following link (or copy and paste it into your browser).`;
      const mailOptions = {
        from: "<varsha@appsvolt.com>", // sender address
        to: emailId,
        subject: emailSubject, // Subject line
        template: './confirmation', 
        context: { 
           url:url,
           emailBody:emailBody
        },
       };
      const sentEmali = this.mailerService.sendMail(mailOptions);
      return sentEmali
      .then((data: { MessageId: any }) => {
        return { Status: 200, messageId: data.MessageId };
      })
      .catch((err: { stack: any }) => {
        return { Status: 400, Error: err };
      });
    }

    /**
    * Send Reset Password Link 
    * @param email,verification_code
    * @return status 
    */
    async sendResetPasswordLink(emailId: string,verification_code:string) {  
      const emailSubject = 'Reset Password';
      const emailBody = `To reset your password, please click the following link (or copy and paste it into your browser).`;
      const url = `http://localhost:4200/reset-password/${emailId}/${verification_code}`;
      const mailOptions = {
        from: "<varsha@appsvolt.com>",
        to: emailId,
        subject: emailSubject,
        template: './forgotpassword', 
        context: { 
          url:url,
          emailBody:emailBody
        },
      };
      const sentEmali = this.mailerService.sendMail(mailOptions);
      return sentEmali
        .then((data: { MessageId: any }) => {
          return { Status: 200, messageId: data.MessageId };
        })
        .catch((err: { stack: any }) => {
          return { Status: 400, Error: err };
      });
    }

    /**
    * Send Reset Password Link 
    * @param email,verification_code
    * @return status 
    */
     async sendForgotPasswordLink(emailId: string,verification_code:string) {  
      const emailSubject = 'Reset Password';
      const emailBody = `To reset your password, please click the following link (or copy and paste it into your browser).`;
      const url = `http://localhost:4200/reset-password/${emailId}/${verification_code}`;
      const mailOptions = {
        from: "<varsha@appsvolt.com>",
        to: emailId,
        subject: emailSubject,
        template: './forgotpassword', 
        context: { 
          url:url,
          emailBody:emailBody
        },
      };
      const sentEmali = this.mailerService.sendMail(mailOptions);
      return sentEmali
        .then((data: { MessageId: any }) => {
          console.log("200")
          return { Status: 200, messageId: data.MessageId };
        })
        .catch((err: { stack: any }) => {
          console.log("400",err)
          return { Status: 400, Error: err };
      });
    }
}
