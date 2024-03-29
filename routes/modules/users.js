const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs') 





router.get('/login',(req, res) => {
  res.render('login')
}) 

router.post('/login', passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/login'
  }))
//req.flash('warning_msg', 'Email or Password is wrong !')
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register',(req, res) => {
  const {name, email, password, confirmPassword} = req.body
  const errors = []
  if( !email || !password || !confirmPassword ){
    errors.push({ message: 'Email、Password、Confirm Password欄位都是必填。'})
  }
  if(password !== confirmPassword){
    errors.push({ message: '密碼與確認密碼不符!'})
  }
  if(errors.length){
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email }).then(user => {
    // 判斷email是否已存在
    if (user){
      errors.push({message: '這個Email已經註冊過了。'})
      res.render('register',{errors, name, email, password, confirmPassword })
    }
    return bcrypt
      .genSalt(10)
      .then( salt => bcrypt.hash(password, salt))
      .then( hash => User.create({
        name,
        email,
        password: hash
      }))
      .then( () => res.redirect('/'))
      .catch(err => console.log(err))
  })
})


router.get('/logout', (req, res) => {
  req.logout() //Passport.js 提供的函式
  req.flash('success_msg', '成功登出 !')
  res.redirect('/users/login')
})

module.exports = router