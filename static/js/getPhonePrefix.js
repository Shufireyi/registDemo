import prefix from '../phone.json'

var fixArray = prefix.data
fixArray.sort(function (item1, item2) {
  return item1.countryPinyin > item2.countryPinyin ? 1 : -1
})

export default fixArray
