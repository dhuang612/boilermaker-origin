const router = require('express').Router()
const {User, Emails, Shoutouts} = require('../db/models')
const sender = require('../emails/mailer')

module.exports = router

//need to post a new one
router.post('/new', async (req, res, next) => {
  try {
    if (req.body) {
      let from
      const user = req.user
      console.log('this is the email to add', req.body.email)
      console.log('this is our user', user)
      if (!req.body.from) {
        from = 'N/A'
      }
      const emailToCheck = req.body.email
      const checkEmail = await Emails.findOne({where: {email: emailToCheck}})
      if (!checkEmail) {
        res.status(401).send('email doesnt exist')
      } else {
        //magic method given to us by sequelize
        const createNewSO = await user.createShoutout({
          name: req.body.name,
          message: req.body.message,
          email: req.body.email,
          from: req.body.from || from
        })
        if (createNewSO) {
          res.status(200).send('successfully made new SO')
        }
      }
    }
  } catch (error) {
    console.error(error)
  }
})

router.get('/showAllShoutouts', async (req, res, next) => {
  try {
    console.log(req.user.id)
    const id = req.user.id
    const shoutouts = await Shoutouts.findAll({where: {userId: req.user.id}})
    console.log('these are your shoutouts ---> ', shoutouts)
    if (shoutouts) {
      res.status(200).json(shoutouts)
    } else {
      res.status(404).send('No shoutouts to show!')
    }
  } catch (error) {
    console.error(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const shoutoutToSend = await Shoutouts.findByPk(req.params.id)
    res.send(shoutoutToSend)
  } catch (error) {
    next(error)
  }
})

//send the shoutout
router.post('/send', async (req, res, next) => {
  try {
    if (req.body) {
      console.log('this is what req.body holds', req.body)
      const name = req.body.name
      const message = req.body.message
      let data = {
        templateName: 'shoutouts',
        sender: 'no-reply@shoutout.com',
        receiver: req.body.email,
        name,
        message,
        welcome_url: 'https://shoutouts-the-app.herokuapp.com/auth/login'
      }
      const sendEmail = sender.sendEmail(data)
      if (sendEmail) {
        res.status(200).send('successfully sent so!')
      }
    }
  } catch (error) {
    console.error(error)
  }
})
