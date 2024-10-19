import nodemailer from 'nodemailer'

type EmailOption = {
  email: string
  subject: string
  message: string
}
const sendEmail = async (options: EmailOption) => {
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  })
  const mailoption = {
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: options.email, // list of receivers
    subject: options.subject,
    text: options.message,
  }
  await transporter.sendMail(mailoption)
}
export default sendEmail
