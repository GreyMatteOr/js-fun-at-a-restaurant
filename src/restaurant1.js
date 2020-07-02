var restaurant = (() => {
  var globals = {
  }
  function construct(name) {
    this.name = name
    this.menus = {
      breakfast: [],
      lunch: [],
      dinner: []
    }

  }
  return construct
})()

var createRestaurant = (name) => new restaurant(name)

function addMenuItem(rest, item) {
  (rest.menus[item.type].includes(item)) ? '' : rest.menus[item.type].push(item)
}

function removeMenuItem(rest, itemName) {
  var ret = `Sorry, we don't sell ${itemName}, try adding a new recipe!`
  Object.keys(rest.menus).forEach((menu, pos) => {
    const idTest = rest.menus[menu].map((item) => {
      return item.name == itemName
    })
    if (idTest.includes(true)) {
      ret = `No one is eating our ${itemName} - it has been removed from the ${menu} menu!`
      _removeMenuItem(rest.menus[menu], itemName, idTest)
    }
  })
  return ret
}

function _removeMenuItem(arr, itemName, idTest) {
  console.log(`ENTERED ${itemName}`);
  for (var i = 0, run = arr.length; i < run; i++) {
    (idTest[i]) ? arr.shift(): arr.push(arr.shift)
  }
}

module.exports = {
  createRestaurant,
  addMenuItem,
  removeMenuItem
}
