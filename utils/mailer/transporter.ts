import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
export const transporter = nodemailer.createTransport({
  host: 'smtp.mail.yahoo.com',
  service: 'Yahoo',
  port: 465,
  auth: {
    user: 'vuongtran216@yahoo.com',
    pass: 'akluvgxikmqvouci',
  },
});
