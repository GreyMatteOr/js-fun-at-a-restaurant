function nameMenuItem(item) {
  return `Delicious ${item}`
}

function createMenuItem(name, price, type) {
  return {
    name: name,
    price: price,
    type: type
  }
}

function addIngredients(ingredient, arr) {
  (arr.includes(ingredient)) ? '' : arr.push(ingredient)
}

function formatPrice(price) {
  return `$${price}`
}

function decreasePrice(price) {
  return price * 0.9
}

function createRecipe(title, arr, type) {
  return {
    title: title,
    ingredients: arr,
    type: type
  }
}

module.exports = {
  nameMenuItem,
  createMenuItem,
  addIngredients,
  formatPrice,
  decreasePrice,
  createRecipe
}
