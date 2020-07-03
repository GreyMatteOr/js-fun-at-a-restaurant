class Chef {
  constructor(name, rest) {
    this.name = name
    this.restaurant = rest
  }

  greetCustomer(name, isMorning = false){
    return (isMorning) ? `Good morning, ${name}!` : `Hello, ${name}!`
  }

  checkForFood(item){
    return (Object.keys(this.restaurant.menus).reduce((isInPrev, cur) => {
      return this.restaurant.menus[cur].includes(item) || isInPrev
    }, false)) ? `Yes, we're serving ${item.name} today!` : `Sorry, we aren't serving ${item.name} today.`
  }
}

module.exports = Chef;
