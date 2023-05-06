// 匯出一個物件，物件裡是一個叫做 authenticator 的函式。


module.exports = {
  authenticator: (req,res, next) => {
    if(req.isAuthenticated()){
      return next()
    }
    req.flash('warning_msg', '請先登入才能使用 !')
    res.redirect('users/login')
  }
}