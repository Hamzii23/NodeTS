import { RESONSE_MESSAGE } from '../../Constants/Messages'
import Tour from './Schema'
const APIFeature = require('../../utils/apiFeatures')
interface TourDocument {
  name: string
  duration: number
  price: number
}

class TourFunc {
  async createTour(request: Request) {
    const newTour = await Tour.create(request)
    return {
      message: 'Sucessfully Create New Tour',
      success: true,
      tourData: newTour,
    }
  }

  async getTours(request: any) {
    const feature = new APIFeature(Tour.find(), request.query)
      .filter()
      .sort()
      .fields()
      .pagination()
    let tours = await feature.query
    if (tours.length === 0)
      return {
        message: RESONSE_MESSAGE.noRecordFound,
        success: false,
        tourData: [],
      }
    return {
      message: 'Success',
      success: true,
      tourData: tours,
    }
  }

  async getTourById(id: string) {
    const tourResult = await Tour.findById(id)
    return tourResult
  }

  async updateTour(id: string, body: Partial<TourDocument>) {
    const tourResult: TourDocument | null = await Tour.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      },
    )
    if (tourResult === null)
      return {
        message: RESONSE_MESSAGE.noRecordFound,
        success: false,
        tourData: [],
      }
    return {
      message: 'Success',
      success: true,
      tourData: tourResult,
    }
  }

  async deleteTour(id: string) {
    const tourResult: TourDocument | null = await Tour.findByIdAndDelete(id)

    if (!tourResult) {
      return {
        message: 'Not Record Found or already Deleted',
        success: false,
        tourData: [],
      }
    }
    return {
      message: 'Success',
      success: true,
      tourData: [],
    }
  }
}

export = new TourFunc()
