import { transporter } from "@utils/nodemailer";
import { logger } from "@utils/logger";
import { EmailData } from "@/interfaces/nodemailer.interface";

export const sendEmail = (emailData: EmailData) =>
  transporter.sendMail(emailData, (err, info) => {
    if (err) {
      logger.error(`sendEmail: ${err.stack}`);
    }
    logger.info(
      `Email Sent, Envelope: ${info.envelope}, MessageId: ${info.messageId}`
    );
  });

export function getFileStream(bucket: string, pathKey: string) {
  throw new Error("Function not implemented.");
}
