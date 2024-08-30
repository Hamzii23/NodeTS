import mongoose from 'mongoose'

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour Must have Name'],
    unique: true,
    trim: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour Must have Price'],
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have Duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a Difficulty'],
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  discountPrice: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a Summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  coverImage: {
    type: String,
    required: [true, 'A tour must have a cover Image'],
  },
  images: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDate: [Date],
})

const Tour = mongoose.model('Tour', tourSchema)
export default Tour
