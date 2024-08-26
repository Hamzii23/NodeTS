import mongoose from 'mongoose'

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour Must have Name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour Must have Price'],
  },
})

const Tour = mongoose.model('Tour', tourSchema)
module.exports = Tour
