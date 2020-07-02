var restaurant = (() => {
  var globals = {}

  function construct(name) {
    this.name = name
    this.menus = {
      breakfast: [],
      lunch: [],
      dinner: []
    }
    this.itemRefs = {}

  }
  return construct
})()

var createRestaurant = (name) => new restaurant(name)

function addMenuItem(rest, item) {
  if (rest.itemRefs[item.name] == undefined) {
    rest.itemRefs[item.name] = item.type
    rest.menus[item.type].push(item)
  }
}

function removeMenuItem(rest, itemName) {
  console.log(rest.itemRefs[itemName]);
  return (rest.itemRefs[itemName] == undefined) ? `Sorry, we don't sell ${itemName}, try adding a new recipe!` : _removeMenuItem(rest, itemName)
}

function _removeMenuItem(rest, itemName) {
  var arr = rest.menus[rest.itemRefs[itemName]]
  for (var i = 0, run = arr.length; i < run; i++) {
    (arr[i].name == itemName) ? arr.shift() : arr.push(arr.shift())
  }
  return `No one is eating our ${itemName} - it has been removed from the ${rest.itemRefs[itemName]} menu!`
}

module.exports = {
  createRestaurant,
  addMenuItem,
  removeMenuItem
}
