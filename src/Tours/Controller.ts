const fs = require('fs')
const TourFunc = require('./Bussiness')
import { Request, Response, NextFunction } from 'express'
const toursData = require('../../data')

const checkId = async (
  request: Request,
  response: Response,
  next: NextFunction,
  _value: string,
) => {
  const result = await TourFunc.checkValidId(request.params.id, toursData)
  if (result) {
    return response.status(404).json({ result })
  }
  next()
}

const getTours = async (request: Request, response: Response) => {
  const tourResult = await TourFunc.getTours(toursData)
  response.status(200).json({ tourResult })
}

const updateTours = (request: Request, response: Response) => {
  const newId = toursData[toursData.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, request.body)
  toursData.push(newTour)
  fs.writeFile(
    `${__dirname}/data/simple_data.json`,
    JSON.stringify(toursData),
    (error: { message: string }) => {
      if (error) {
        return response.status(500).json({
          message: 'Error writing file',
          error: error.message,
        })
      }
      response.status(201).json({
        message: 'Sucess',
        result: toursData.length,
        data: {
          tours: toursData,
        },
      })
    },
  )
}
export { checkId, getTours, updateTours }
