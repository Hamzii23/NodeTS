class TourFunc {
  async getTours(data: string[]) {
    if (data.length === 0)
      return {
        message: 'No Record Has been Found',
        result: false,
        tourLength: 0,
        tourData: [],
      }
    return {
      message: 'Success',
      result: true,
      tourLength: data.length,
      tourData: data,
    }
  }
  async checkValidId(id: string, tourData: string[]) {
    if (parseInt(id) > tourData.length) {
      return {
        status: 'fail',
        message: 'Invalid ID',
      }
    }
  }
}

module.exports = new TourFunc()
