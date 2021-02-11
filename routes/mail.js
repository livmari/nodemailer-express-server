const express = require('express')
const mailController = require('../controllers/mail')

const router = express.Router()

router.route('/').post(mailController.postMail)

module.exports = router