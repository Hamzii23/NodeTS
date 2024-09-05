import mongoose from 'mongoose'

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour Must have Name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must or equal 40 char'],
      minlength: [40, 'A tour name must or equal 10 char'],
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
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is eiher:easy,medium,difficult',
      },
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
      maxlength: [5, 'Rating must be below 5.0'],
      minlength: [1, 'Rating must be above 1.0'],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    discountPrice: {
      type: Number,
    },
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)
tourSchema.virtual('weekDuration').get(function () {
  return this.duration / 7
})
const Tour = mongoose.model('Tour', tourSchema)
export default Tour
