import nodemailer from 'nodemailer';

// create Nodemailer SES transporter
export const transporter = nodemailer.createTransport({
  // SES: AWS_SES,
});
