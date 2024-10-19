export const filterRequestFileds = (obj: any, ...allowFileds: string[]) => {
  const filterObj: any = {}
  Object.keys(obj).forEach(el => {
    if (allowFileds.includes(el)) {
      filterObj[el] = obj[el]
    }
  })
  return filterObj
}
