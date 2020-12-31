import Mailgen from 'mailgen';
const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
      // Appears in header & footer of e-mails
      name: 'Chat for fun',
      link: '#'
      // Optional product logo
      // logo: 'https://mailgen.js/img/logo.png'
  }
});
export const mail = (data: any) => {
  const template = {
    body: {
      name: data.fullName,
      intro: 'Wellcome to ChatWork! We\'re very excited to have you on board.',
      action: {
        instructions: 'To get started with us, Here is your account activation code:',
        button: {
          color: '#22BC66', // Optional action button color
          text: 'Confirm your account',
          link: `http://localhost:5000/confirm?s=${data.activeToken}`
        }
      }
    }
  };
  const mailBody = mailGenerator.generate(template);
  const mailText = mailGenerator.generatePlaintext(template);
  return { text: mailText, html: mailBody}
}