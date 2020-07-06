function takeOrder(order, arr) {
  (arr.length < 3) ? arr.push(order): ''
}

function refundOrder(pos, arr) {
  for (var i = 0, run = arr.length; i < run; i++) {
    (arr[i] == undefined || arr[i].orderNumber != pos) ? arr.push(arr.shift()): arr.shift()
  }
}

function listItems(arr) {
  return arr.map((item) => item.item)
            .reduce((sum, cur) => `${sum}, ${cur}`)
}

function searchOrder(arr, item) {
  return arr.reduce((isInPrev, cur) => (cur.item === item) || isInPrev, false)
}

module.exports = {
  takeOrder,
  refundOrder,
  listItems,
  searchOrder
}
