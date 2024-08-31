class APIFeature {
  request: any
  query: any
  constructor(query: any, request: any) {
    this.query = query
    this.request = request
  }
  filter() {
    const queryObj = { ...this.request }
    const excludeField: string[] = ['page', 'sort', 'limit', 'fields']
    excludeField.forEach(del => delete queryObj[del])

    let queryStr: any = JSON.stringify(queryObj)
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match: any) => `$${match}`,
    )
    queryStr = JSON.parse(queryStr)
    this.query.find(queryStr)
    return this
  }

  sort() {
    if (this.request.sort) {
      const sortQue = this.request.sort.split(',').join(' ')
      this.query.sort(sortQue)
    }
    return this
  }

  fields() {
    if (this.request.fields) {
      const fieldsQue = this.request.fields.split(',').join(' ')
      this.query.select(fieldsQue)
    }
    return this
  }

  pagination() {
    const page = this.request.page * 1 || 1
    const limit = this.request.limit * 1 || 10
    const skip = (page - 1) * limit

    this.query.skip(skip).limit(limit)
    return this
  }
}

module.exports = APIFeature
