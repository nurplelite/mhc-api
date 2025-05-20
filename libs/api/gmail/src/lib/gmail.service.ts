import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const SCOPES = ['https://mail.google.com/'];

export class GmailService {
  private jwtClient: JWT;

  constructor(private delegatedUser: string) {
    this.jwtClient = new google.auth.JWT({
      email: process.env.GSA_CLIENT_EMAIL, // service account email
      key: process.env.GSA_PRIVATE_KEY?.replace(/\\n/g, '\n'), // properly formatted private key
      scopes: SCOPES,
      subject: delegatedUser, // sendAs user
    });
  }

  async sendMail({ to, subject, message }: { to: string, subject: string, message: string }) {
    const gmail = google.gmail({ version: 'v1', auth: this.jwtClient });

    const rawMessage = Buffer.from([
      `From: ${this.delegatedUser}`,
      `To: ${to}`,
      `Subject: ${subject}`,
      'Content-Type: text/html; charset=UTF-8',
      '',
      message,
    ].join('\n')).toString('base64url');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: rawMessage,
      },
    });
  }
}
