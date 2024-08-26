import express from 'express'
import { checkId, getTours, updateTours } from './Controller'

const tourRoutes = express.Router()
// tourRoutes.param('id', (req, res, next, val) => {
//   console.log('TourID',val)
//   next()
// })

tourRoutes.param('id', checkId) //midleware
tourRoutes.route('/').get(getTours).post(updateTours)
tourRoutes.route('/:id').get(getTours)
export default tourRoutes
