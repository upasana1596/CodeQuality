import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: {
      //   host: 'smtp.mailtrap.io',
      //   secure: false,
      //   auth: {
      //     user: '42d361bf2ba812',
      //     pass: 'f8cb7a6a834019',
      //   },
      // },
      transport: {
        host: 'smtp.zoho.com',
        secure: false,
        auth: {
          user: 'upasna@appsvolt.com',
          pass: 'Full$tack@123',
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
