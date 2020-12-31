import { transporter } from './transporter';
import { mail } from './mailgen';

export const sendMail = async (data: any) => {
  const email = mail(data)
  const info = await transporter.sendMail({
    from: 'vuongtran216@yahoo.com',
    to: data.email,
    subject: 'Active your account with code',
    text: email.text,
    html: email.html
  })
  console.log(info)
}
