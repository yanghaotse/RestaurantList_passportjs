# 我的餐廳清單
![我的餐廳清單-首頁](/image/restaurantlist_passport.png)
## 介紹

記錄屬於自己的餐廳清單，可以瀏覽餐廳、查看詳細資訊、甚至連結到地圖。
### 功能
* 使用者認證系統
* 查看所有餐廳
* 瀏覽餐廳的詳細資訊
* 新增餐廳資料
* 修改餐廳資料
* 刪除餐廳資料
* 連結餐廳的地址到 Google 地圖
* 搜尋特定餐廳
* 依選取類型排序餐廳(此功能目前只能在首頁使用)
## 開始使用

1. 請先確認有安裝 node.js 與 npm
2. 將專案 clone 到本地
3. 在本地開啟之後，透過終端機進入資料夾，輸入：
  ```
  npm install
  ```
4. 安裝完畢後，繼續輸入：
  ```
  npm run seed
  ```
5. 若看見此行訊息則代表與資料庫連結成功
  ```
  mongoDB connected!
  ```
6. 繼續輸入：
  ```
  npm run start
  ```
7. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址
  ```
  Express is running on http://localhost:3000
  ```
8. 若欲暫停使用
  ```
  ctrl + c
  ```
9. 測試種子資料
  ```
  npm run seed
  ```
10. 若看見此二訊息則代表順利運行
 ```
  restaurantSeeder1 done.
  restaurantSeeder2 done.
  ```
## 開發工具

* Node.js 18.15.0
* Express 4.18.2
* Express-Handlebars 4.0.2
* Bootstrap 5.1.3
* Font-awesome 6.4.0
* Google Font 
* MongoDB
* mongoose 5.9.7
* passport 0.4.1
* passport-facebook 3.0.0
* passport-local 1.0.0
* dotenv
* bcryptjs
* connect-flash
* method-override