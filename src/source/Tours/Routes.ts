import express from 'express'
import {
  createTour,
  deleteTour,
  getTourById,
  getTours,
  updateTours,
} from './Controller'
import { protect, restrictToRole } from '../../middlewares/protect'

const tourRoutes = express.Router()

tourRoutes.route('/').get(protect, getTours).post(createTour)
tourRoutes
  .route('/:id')
  .get(getTourById)
  .patch(updateTours)
  .delete(protect, restrictToRole('lead-guid', 'admin'), deleteTour)

export default tourRoutes
