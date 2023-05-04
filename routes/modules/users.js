const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/login',(req, res) => {
  res.render('login')
}) 

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register',(req, res) => {
  const {name, email, password, confirmPassword} = req.body
  User.findOne({ email }).then(user => {
    // 判斷email是否已存在
    if (user){
      console.log('User already exist.')
      res.render('register',{ name, email, password, confirmPassword })
    }else{
      return User.create({
        name,
        email,
        password
      })
      .then( () => res.redirect('/'))
      .catch(err => console.log(err))
    }
  })
  .catch(err => console.log(err))
})

module.exports = router