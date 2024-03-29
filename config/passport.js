const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const FacebookStrategy = require('passport-facebook').Strategy

module.exports = (app) => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({usernameField : 'email'}, (email, password ,done) => {
    User.findOne({ email })
      .then(user => {
        if(!user){
          return done(null, false, { message: 'That email is not registered!'})
        }
        return bcrypt.compare( password, user.password)
          .then(isMatch => {
            if(!isMatch){
              return done(null, false , { message: 'Email or password incorrect.'})
            }
            return done(null, user)
          })
      })
      .catch(err => done(err, false))
  }))
  // 設定facebook登入策略
  passport.use(new FacebookStrategy ({ 
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName'] 
    // displayname:Facebook 上的公開名稱，也許能和 User 的 name 屬性對應起來
  },(accessToken, refreshToken, profile, done) => {
      // console.log(profile) ->需要的資訊載profile裡的_json物件
      const {name, email} = profile._json
      User.findOne({ email })
        .then( user => {
          if(user) return done(null, user)
          const randomPassword = Math.random().toString(36).slice(-8)
          // toString(36) -> 運用36進位，變成英數參雜的亂碼(10個數字 + 26個英文字母)
          // slice(-8) -> 截切字串的最後一段，得到八個字母
          bcrypt
            .genSalt(10)
            .then( salt => bcrypt.hash(randomPassword, salt))
            .then( hash => User.create({
              name,
              email,
              password: hash
            }))
            .then( user => done(null, user))
            .catch( err => done(err, false))
        })
    }
  ))
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then( user => done(null, user))
      .catch(err => done(err, null))
  })
}