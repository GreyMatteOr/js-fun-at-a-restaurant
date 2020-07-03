var restaurant = (() => {
  var _globals = {
    _cityTaxes : 0
  }

  function construct(name) {
    this.name = name
    this.foodCost = 0
    this._revenue = 0
    this._taxesDue = 0
    Object.defineProperty(this, 'revenue', {
      get(){
        return floorToCents(this._revenue)
      },
      set(x){
        this.taxesDue += calculateTaxes(x - this._revenue)
        this._revenue = x
      }
    })
    Object.defineProperty(this, 'taxesDue', {
      get(){
        return floorToCents(this._taxesDue)
      },
      set(x){
        this.cityTaxes += x - this._taxesDue
        this._taxesDue = x
      }
    })
    Object.defineProperty(this, 'cityTaxes', {
      get() {
        return floorToCents(_globals._cityTaxes)
      },
      set(x) {
        _globals._cityTaxes = x
      }
    })
    Object.defineProperty(this, 'profit', {
      get() {
        return floorToCents(this.revenue - this.foodCost - this.taxesDue)
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

var createRestaurant = (name) => new restaurant(name)

function addMenuItem(rest, item) {
  if (rest.itemRefs[item.name] == undefined) {
    rest.itemRefs[item.name] = item.type
    rest.menus[item.type].push(item)
  }
}

function removeMenuItem(rest, itemName) {
  return (rest.itemRefs[itemName] == undefined) ? `Sorry, we don't sell ${itemName}, try adding a new recipe!` : _removeMenuItem(rest, itemName)
}

function _removeMenuItem(rest, itemName) {
  var arr = rest.menus[rest.itemRefs[itemName]]
  for (var i = 0, run = arr.length; i < run; i++) {
    (arr[i].name == itemName) ? arr.shift(): arr.push(arr.shift())
  }
  return `No one is eating our ${itemName} - it has been removed from the ${rest.itemRefs[itemName]} menu!`
}

function orderMenuItem(rest) {
  const menuKeys = Object.keys(rest.menus)
  var menu = Math.floor((menuKeys.length) * Math.random())
  menu = menuKeys[menu]
  var item = Math.floor((rest.menus[menu].length) * Math.random())
  item = rest.menus[menu][item]
  _recordMoney(rest, item)
  return item
}

function _recordMoney(rest, item) {
  rest.foodCost += 5
  rest.revenue += floorToCents(item.price)
}

function floorToCents(price){
   return(Math.floor(Number(price) * 100))/100
}

function calculateTaxes(price){
  return (Number(price)/10)
}

module.exports = {
  createRestaurant,
  addMenuItem,
  removeMenuItem,
  orderMenuItem,
  floorToCents,
  calculateTaxes
}
