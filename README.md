# Tiny mail sender API

This repository contains a single api endpoint that takes json data and sends an email to a pre-defined email address.

📚 The api uses **[Nodemailer](https://nodemailer.com/about/)** to send the email, and **[Express](https://expressjs.com/)** to handle the api requests and responses.

The Express server is mostly for testing, but could be cloned and built upon to create a client-server model with a frontend framework. Otherwise, the controller and the route can both be copied over to an existing server to reach the same goal.