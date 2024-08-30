const TourFunc = require('./Bussiness')
import { Request, Response } from 'express'

const createTour = async (request: Request, response: Response) => {
  try {
    const tourResult = await TourFunc.createTour(request.body)
    response.status(200).json({ tourResult })
  } catch (error) {
    response.status(404).json({ error })
  }
}

const getTours = async (request: Request, response: Response) => {
  try {
    const result = await TourFunc.getTours()
    response.status(200).json({ result })
  } catch (error) {
    response.status(404).json({ error })
  }
}

const getTourById = async (request: Request, response: Response) => {
  try {
    const result = await TourFunc.getTourById(request.params.id)
    response.status(200).json({ result })
  } catch (error) {
    response.status(404).json({ error })
  }
}

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
