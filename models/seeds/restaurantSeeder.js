
const Restaurant = require("../restaurant")
const restaurantList = require("../restaurant-list.json").results
const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const db = require('../../config/mongoose')

if(process.env.NODE_URI !== 'production'){
  require('dotenv').config()
}


const SEED_USER1 = {
  name: 'SEED_USER1',
  email: 'user1@example.com',
  password: '12345678',
  restaurantsList: restaurantList.slice(0,3) //餐廳1-3
}
const SEED_USER2 = {
  name: 'SEED_USER2',
  email: 'user2@example.com',
  password: '12345678',
  restaurantsList: restaurantList.slice(3,6) //餐廳4-6
}



db.once("open", async() => {   
  bcrypt
    .genSalt(10)
    .then( salt => bcrypt.hash( SEED_USER1.password, salt))
    .then( hash => User.create({
      name: SEED_USER1.name,
      email: SEED_USER1.email,
      password: hash
  }))
  .then( async user => {
    const userId = user._id
    for(let i = 0; i < SEED_USER1.restaurantsList.length; i++){
      const {name, name_en, category, image, location, phone, google_map, rating, description} = SEED_USER1.restaurantsList[i]
      await Restaurant.create({ 
        name: name,
        name_en: name_en,
        category: category,
        image: image,
        location: location,
        phone: phone,
        google_map: google_map,
        rating: rating,
        description: description,
        userId
      })     
    }
    console.log("restaurantSeeder1 done.")
  })
  bcrypt
    .genSalt(10)
    .then( salt => bcrypt.hash( SEED_USER2.password, salt))
    .then( hash => User.create({
      name: SEED_USER2.name,
      email: SEED_USER2.email,
      password: hash
  }))
  .then( async user => {
    const userId = user._id
    for(let i = 0; i < SEED_USER2.restaurantsList.length; i++){
      const {name, name_en, category, image, location, phone, google_map, rating, description} = SEED_USER2.restaurantsList[i]
      await Restaurant.create({ 
        name: name,
        name_en: name_en,
        category: category,
        image: image,
        location: location,
        phone: phone,
        google_map: google_map,
        rating: rating,
        description: description,
        userId
      })     
    }
    console.log("restaurantSeeder2 done.")
  })
  .catch(err => console.log(err))
  .finally(() => db.close())
})


// 尚未簡化種子資料程式碼:
// const createUserAndRestaurants = (user, restaurants) => {
//   const {name, email} = user
//   console.log(name, email)
//   bcrypt
//     .genSalt(10)
//     .then(salt => bcrypt.hash(user.password, salt))
//     .then(hash => User.create({
//       name,
//       email,
//       password: hash
//     }))
//     .then(user => {
//       const userId = user._id
      
//       // const restaurant = restaurants.map(restaurant => {
//       //   return Restaurant.create({
//       //     ...restaurant,
//       //     userId
//       //   })
//       // })
//       return Promise.all(Array.from(
//         { length: restaurants.length},(_, i) => Restaurant.create({
//           name: restaurants[i].name,
//           name_en: restaurants[i].name_en,
//           category: restaurants[i].category,
//           image: restaurants[i].image,
//           location: restaurants[i].location,
//           phone: restaurants[i].phone,
//           google_map: restaurants[i].google_map,
//           rating: restaurants[i].rating,
//           description: restaurants[i].description,
//           userId
//         })
//       ))
//     })
//     .then(() => console.log(`User ${name} and their restaurants created`))
//     .catch(error => console.log(error))
// }

// db.once('open', () => {
//   Promise.all([
//     createUserAndRestaurants(SEED_USER1, SEED_USER1.restaurantsList),
//     createUserAndRestaurants(SEED_USER2, SEED_USER2.restaurantsList)
//   ])
//   .then(() => {
//     console.log('All seeders done.')
//     process.exit()
//   })
//   .catch((error => console.log(error)))
// })




// async/ await: 是 JavaScript 的 Promise 語法的擴展，可以讓開發者使用同步的方式編寫異步程式碼，讓程式碼更簡潔易讀。
// try/ catch/ finally: 這是 JavaScript 的錯誤處理語法，用於捕獲可能出現的錯誤並進行處理。
  







