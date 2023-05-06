const express = require('express')
const session = require('express-session') // 引入session
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const bodyParser = require("body-parser")
const methodOverride = require('method-override')
const routes = require('./routes')//引入路由器時，路徑設定為 /routes 就會自動去尋找目錄下叫做 index 的檔案
require('./config/mongoose')
const usePassport = require('./config/passport')
const flash = require('connect-flash')

const app = express()
const port = 3000

app.engine('hbs', exphbs({defaultLayout : 'main', extname : '.hbs'}))
app.set('view engine', 'hbs')

// 設定session
app.use(session({
  secret:'ThisIsMySecret',
  resave: false, 
  // resave: 設定為 true 時，會在每一次與使用者互動後，強制把 session 更新到 session store 裡。
  saveUninitialized: true
  // saveUninitialized: 強制將未初始化的 session 存回 session store。未初始化表示這個 session 是新的而且沒有被修改過，例如未登入的使用者的 session
}))

app.use(express.urlencoded({ extended : true })) //body-parser
app.use(express.static('public')) //使用靜態檔案
app.use(methodOverride('_method'))

usePassport(app) //掛載passport套件
app.use(flash()) //掛載flash套件
app.use((req, res, next) => {
  // console.log(req.user) //檢查用
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen( port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
