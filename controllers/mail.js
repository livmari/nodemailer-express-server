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
      const websiteName = 'Website name'

      // Create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: `${req.body.recieverEmail}`, // Generated ethereal user
          pass: `${req.body.recieverPassword}`, // Generated ethereal password
        },
      })
      ;``
      const message = {
        from: `${req.body.senderName} 👻 <${req.body.senderEmail}>`, // Sender address
        to: 'marc98@ethereal.email', // List of receivers
        subject: `New message from: ${req.body.senderName}`, // Subject line

        // Plain text body
        text: `\n
                    A new message was sent to you from ${websiteName}\n
                    Name: ${req.body.senderName}\n
                    Email: ${req.body.senderEmail}\n
                    Subject: ${req.body.subject}\n
                    ${req.body.message}\n`,

        // Html body
        html: `<h1>A new message was sent to you from ${websiteName} 🥳</h1>
          <table style="text-align: left">
          <tr>
              <th>Name:</th>
              <td>${req.body.senderName}</td>
          </tr>
          <tr>
              <th>Email:</th>
              <td>${req.body.senderEmail}</td>
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
                  <td>${req.body.message}</td>
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
