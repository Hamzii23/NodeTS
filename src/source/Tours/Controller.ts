const catchAsync = require('../../utils/catchAsync')
const AppError = require('../../utils/appError')
import { NextFunction, Request, Response } from 'express'
import TourFunc from './Bussiness'

const createTour = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const tourResult = await TourFunc.createTour(request.body)
    response.status(200).json({ tourResult })
  },
)

const getTours = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await TourFunc.getTours(request)
    if (!result.success) {
      return next(new AppError('No tour Found ', 404))
    }
    response.status(200).json({ result })
  },
)

const getTourById = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await TourFunc.getTourById(request.params.id)
    if (!result) {
      return next(new AppError('No tour Found with ID', 404))
    }
    response.status(200).json({ result })
  },
)

const updateTours = async (request: Request, response: Response) => {
  try {
    const result = await TourFunc.updateTour(request.params.id, request.body)
    response.status(200).json({ result })
  } catch (error) {
    response.status(404).json({ error })
  }
}

const deleteTour = async (request: Request, response: Response) => {
  try {
    const result = await TourFunc.deleteTour(request.params.id)
    response.status(200).json({ result })
  } catch (error) {
    response.status(404).json({ error })
  }
}

export { getTours, updateTours, createTour, getTourById, deleteTour }
