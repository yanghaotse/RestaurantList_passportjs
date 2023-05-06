const express = require('express')
const Restaurant = require('../../models/restaurant')


const router = express.Router()


router.get('/search',(req, res) => {
  const keyword = req.query.keyword
  // console.log(keyword)
  if (!keyword){
    return res.redirect('/')
  }
  Restaurant.find()
    .lean()
    .then( restaurants => {
      const restaurant = restaurants.filter( (item) => {
        return item.name.toLowerCase().trim().includes(keyword.toLowerCase()) || item.category.toLowerCase().trim().includes(keyword.toLowerCase()) //注意必須加return，否則收不到資料
      })
      res.render('index', { restaurants : restaurant, keyword })
      // console.log(restaurant)
    })
    .catch( error => console.log(error))
})

//新增路由 GET
router.get('/new', (req, res) => {
  return res.render("new")
})


// 新增路由POST
router.post('/', (req, res) => {
  const userId = req.user._id
  const {name, name_en, category, image, location, phone, google_map, rating, description} = req.body
  // console.log(bodyParser)
  return Restaurant.create( {
    name: name,
    name_en: name_en,
    category: category,
    image: image,
    location: location,
    phone: phone,
    google_map: google_map,
    rating: rating,
    description: description,
    userId: userId
  })
    .then( () => res.redirect('/'))
    .catch( error => console.log(error))
})
// 瀏覽一筆資料GET
router.get('/:id/detail', (req,res) => {
  const userId = req.user._id
  const _id = req.params.id
  // console.log(id)
  return Restaurant.findOne({ _id, userId})
    .lean()
    .then((restaurants) => res.render("detail", { restaurants }))
    .catch(error => console.log(error))
})

// 編輯一筆資料 GET
router.get('/:id/edit', (req,res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId})
    .lean()
    .then( (restaurants) => res.render('edit', { restaurants }))
    .catch( error => console.log(error))
})

// 編輯一筆資料 POST
router.put('/:id', (req,res) => {
  const userId = req.user._id
  const _id = req.params.id
  const {name, name_en, category, image, location, phone, google_map, rating, description} = req.body
  return Restaurant.findOne({ _id, userId})
    .then((restaurants) => {
      restaurants.name = name
      restaurants.name_en = name_en
      restaurants.category = category
      restaurants.image = image
      restaurants.location = location
      restaurants.phone = phone
      restaurants.google_map = google_map
      restaurants.rating = rating
      restaurants.description = description
      restaurants.userId = userId
      return restaurants.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}/detail`))
    .catch( error => console.log(error))
})
// 刪除一筆資料
router.delete('/:id', (req,res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId})
    .then( (restaurants) => restaurants.remove()) 
    .then( () => res.redirect('/'))
    .catch( error => console.log(error))
})

module.exports = router