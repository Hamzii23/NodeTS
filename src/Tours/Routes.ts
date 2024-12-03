import express from 'express'
import {
  createTour,
  deleteTour,
  getTourById,
  getTours,
  updateTours,
} from './Controller'

const tourRoutes = express.Router()

tourRoutes.route('/').get(getTours).post(createTour)
tourRoutes.route('/:id').get(getTourById).patch(updateTours).delete(deleteTour)

export default tourRoutes
