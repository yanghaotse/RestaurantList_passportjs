const mongoose = require("mongoose")
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  google_map: {
    type: String,
    required: false
  },
  rating: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  done: {
    type: Boolean
  },
  userId: {
    //定義 userId 這個項目是一個 ObjectId，也就是它會連向另一個資料物件
    type: Schema.Types.ObjectId,
    //定義參考對象是 User model
    ref: 'User',
    index: true,
    required: true
  }
})
module.exports = mongoose.model("Restaurant", restaurantSchema)