// returns an istance of restaurant
var createRestaurant = (name) => new restaurant(name)

// assigns to restaurant the result of self-invoking functionality
// whose purpose is to create the persistent lexically scoped reference data
// around constructor function that is returned
var restaurant = (() => {
  var _globals = {
    _cityTaxes: 0
  }

  function construct(name) {
    this.name = name
    this.foodCost = 0
    this._revenue = 0
    this._taxesDue = 0
    Object.defineProperty(this, 'revenue', {
      get() {
        return (this._revenue)
      },
      set(x) {
        this.taxesDue += calculateTaxesDue(x - this._revenue)
        this._revenue = x
      }
    })
    Object.defineProperty(this, 'taxesDue', {
      get() {
        return (this._taxesDue)
      },
      set(x) {
        this.cityTaxes += x - this._taxesDue
        this._taxesDue = x
      }
    })
    Object.defineProperty(this, 'cityTaxes', {
      get() {
        return (_globals._cityTaxes)
      },
      set(x) {
        _globals._cityTaxes = x
      }
    })
    Object.defineProperty(this, 'profit', {
      get() {
        return (this.revenue - this.foodCost - this.taxesDue)
      }
    })
    this.menus = {
      breakfast: [],
      lunch: [],
      dinner: []
    }
    this.itemRefs = {}
  }
  return construct
})()

// if an item isn't in a restaurant's list of reference data, then add it to the appropriate menu
function addMenuItem(rest, item) {
  if (rest.itemRefs[item.name] == undefined) {
    rest.itemRefs[item.name] = item.type
    rest.menus[item.type].push(item)
  }
}

// if an item is in a restaurant's list of reference data, remove it. Either way, return the appropriate string
function removeMenuItem(rest, itemName) {
  return (rest.itemRefs[itemName] == undefined) ? `Sorry, we don't sell ${itemName}, try adding a new recipe!` : _removeMenuItem(rest, itemName)
}

// does the actualy removal of the item and unsets the item in reference data
function _removeMenuItem(rest, itemName) {
  var arr = rest.menus[rest.itemRefs[itemName]]
  for (var i = 0, run = arr.length; i < run; i++) {
    (arr[i].name == itemName) ? arr.shift(): arr.push(arr.shift())
  }
  const menuName = rest.itemRefs[itemName]
  rest.itemRefs[itemName] = undefined
  return `No one is eating our ${itemName} - it has been removed from the ${menuName} menu!`
}

// Chooses an item to order randomly from a random menu in the restaurant
function orderMenuItem(rest) {
  // creates an array of keys for the restaurant's nonEmpty menus
  const menuKeys = Object.keys(rest.menus).reduce((allPrev, cur) => {
    return (rest.menus[cur].length > 0) ? allPrev.concat(cur) : allPrev
  }, [])
  const menu = menuKeys[Math.floor((menuKeys.length) * Math.random())]
  const item = rest.menus[menu][Math.floor((rest.menus[menu].length) * Math.random())]
  _recordMoney(rest, item)
  return item
}

// merely logs all money transactions. Assumes foodCost for any item is 5$ and taxes are 10% (though that is tracked in the constructor and the calculateTaxesDue function)
function _recordMoney(rest, item) {
  rest.foodCost += 5
  rest.revenue += floorToCents(item.price)
}

// rounds a number to the next lowest hundreth place
function floorToCents(price) {
  return (Math.floor(Number(price) * 100)) / 100
}

// calculates the taxes of an item of price. Assumes Tax rate of 10%
function calculateTaxesDue(price) {
  return (Number(price) / 10)
}

// return what percentage of city taxes originally came from the restaurant
function calculateTaxContibution(rest){
  return rest.taxesDue / rest.cityTaxes
}

module.exports = {
  createRestaurant,
  addMenuItem,
  removeMenuItem,
  orderMenuItem,
  floorToCents,
  calculateTaxesDue,
  calculateTaxContibution,
}
