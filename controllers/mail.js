/*
Ethereal stuff:
Name	    Marc Murray
Username	marc98@ethereal.email (also works as a real inbound email address)
Password	DeTcFVjAsURRYbxtUm
 */

const nodemailer = require('nodemailer')

module.exports = {
  postMail: async (req, res, next) => {
    try {
      const { name, email, subject, text } = req.body
      const websiteName = 'Website name'

      // Create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'marc98@ethereal.email', // Generated ethereal user
          pass: 'DeTcFVjAsURRYbxtUm', // Generated ethereal password
        },
      })
      ;``
      const message = {
        from: `${req.body.name} 👻 <${req.body.email}>`, // Sender address
        to: 'marc98@ethereal.email', // List of receivers
        subject: `New message from: ${req.body.name}`, // Subject line

        // Plain text body
        text: `\n
                    A new message was sent to you from ${websiteName}\n
                    Name: ${req.body.name}\n
                    Email: ${req.body.email}\n
                    Subject: ${req.body.subject}\n
                    ${req.body.text}\n`,

        // Html body
        html: `<h1>A new message was sent to you from ${websiteName} 🥳</h1>
                    <table style="text-align: left">
                    <tr>
                        <th>Name:</th>
                        <td>${req.body.name}</td>
                    </tr>
                    <tr>
                        <th>Email:</th>
                        <td>${req.body.email}</td>
                    </tr>
                    <tr>
                        <th>Subject:</th>
                        <td>${req.body.subject}</td>
                    </tr>
                    </table>
                    <br/>
                    <table style="width: 100%; text-align: left">
                        <tr>
                            <th>Message:</th>
                        </tr>
                        <tr>
                            <td>${req.body.text}</td>
                        </tr>
                    </table>`,
      }

      // Send mail with defined transport object
      const info = await transporter.sendMail(message)

      console.log('Message sent: %s', info.messageId)
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log(
        'Preview URL: %s',
        nodemailer.getTestMessageUrl(info)
      )
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      res.status(201).send('Email sent!')
    } catch (error) {
      next(error)
    }
  },
}
