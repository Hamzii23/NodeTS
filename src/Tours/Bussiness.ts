import { RESONSE_MESSAGE } from '../Constants/Messages'
import Tour from './Schema'

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

  async getTours() {
    const getTours = await Tour.find()
    if (getTours.length === 0)
      return {
        message: RESONSE_MESSAGE.noRecordFound,
        success: false,
        tourData: [],
      }
    return {
      message: 'Success',
      success: true,
      tourData: getTours,
    }
  }

  async getTourById(id: string) {
    const tourResult: TourDocument | null = await Tour.findById(id)
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

module.exports = new TourFunc()
