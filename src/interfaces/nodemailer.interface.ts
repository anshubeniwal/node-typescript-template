import { Readable } from 'stream';

export interface EmailData {
  from: string;
  to: string[];
  subject: string;
  text: string;
  body: object;
  attachments: [
    {
      filename: string;
      path?: string;
      content?: string | Buffer | Readable | undefined;
    },
  ];
}
