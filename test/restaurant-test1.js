var chai = require("chai");
var assert = chai.assert;

var {
  createRestaurant,
  addMenuItem,
  removeMenuItem,
  orderMenuItem,
  floorToCents,
  calculateTaxes
} = require("../src/restaurant1");

describe("restaurant.js", function() {
  describe("createRestaurant", function() {
    it("should be a function", function() {
      assert.isFunction(createRestaurant);
    });

    it("should have a name", function() {
      var pizzaRestaurant = createRestaurant("Sexy Pizza");
      assert.equal(pizzaRestaurant.name, "Sexy Pizza");
    });

    it("should be able to have a different name", function() {
      var arepaRestaurant = createRestaurant("Quiero Arepas");

      assert.equal(arepaRestaurant.name, "Quiero Arepas");
    });

    it("should have menus", function() {
      var pizzaRestaurant = createRestaurant("Sexy Pizza");

      assert.isObject(pizzaRestaurant.menus);
    });

    it("should have different types of menus", function() {
      var pizzaRestaurant = createRestaurant("Sexy Pizza");

      assert.deepEqual(pizzaRestaurant.menus.breakfast, []);
      assert.deepEqual(pizzaRestaurant.menus.lunch, []);
      assert.deepEqual(pizzaRestaurant.menus.dinner, []);
    });
  });

  describe("addMenuItem", function() {
    it("should be a function", function() {
      assert.isFunction(addMenuItem);
    });

    it("should add an item to the lunch menu", function() {
      var pizzaRestaurant = createRestaurant("Sexy Pizza");
      var bbqPizza = {
        name: "BBQ Chicken",
        price: "12.49",
        type: "lunch"
      };

      addMenuItem(pizzaRestaurant, bbqPizza);

      assert.equal(pizzaRestaurant.menus.lunch[0], bbqPizza);
    });

    it("should add menu items to the correct menu automatically", function() {
      var pizzaRestaurant = createRestaurant("Sexy Pizza");
      var bbqPizza = {
        name: "BBQ Chicken Pizza",
        price: "12.49",
        type: "lunch"
      };

      var baconEggsPizza = {
        name: "Bacon and Eggs Pizza",
        price: "13.49",
        type: "breakfast"
      };

      addMenuItem(pizzaRestaurant, bbqPizza);
      addMenuItem(pizzaRestaurant, baconEggsPizza);

      assert.equal(pizzaRestaurant.menus.lunch[0], bbqPizza);
      assert.equal(pizzaRestaurant.menus.breakfast[0], baconEggsPizza);
    });

    it("shouldn't add the same menu item more than once", function() {
      var pizzaRestaurant = createRestaurant("Sexy Pizza");
      var bbqPizza = {
        name: "BBQ Chicken Pizza",
        price: "12.49",
        type: "lunch"
      };

      var baconEggsPizza = {
        name: "Bacon and Eggs Pizza",
        price: "13.49",
        type: "breakfast"
      };

      addMenuItem(pizzaRestaurant, bbqPizza);
      addMenuItem(pizzaRestaurant, baconEggsPizza);
      addMenuItem(pizzaRestaurant, baconEggsPizza);

      assert.deepEqual(pizzaRestaurant.menus, {
        breakfast: [baconEggsPizza],
        lunch: [bbqPizza],
        dinner: []
      });
    });
  });

  describe("removeMenuItem", function() {
    it("should be a function", function() {
      assert.isFunction(removeMenuItem);
    });

    it("should remove an item from the menu to update it", function() {
      var pizzaRestaurant = createRestaurant("Sexy Pizza");
      var bbqPizza = {
        name: "BBQ Chicken Pizza",
        price: "12.49",
        type: "lunch"
      };

      var veggiePizza = {
        name: "Veggie Pizza",
        price: "11.49",
        type: "dinner"
      };

      var baconEggsPizza = {
        name: "Bacon and Eggs Pizza",
        price: "13.49",
        type: "breakfast"
      };

      addMenuItem(pizzaRestaurant, bbqPizza);
      addMenuItem(pizzaRestaurant, baconEggsPizza);
      addMenuItem(pizzaRestaurant, veggiePizza);

      var result = removeMenuItem(pizzaRestaurant, "Bacon and Eggs Pizza", "breakfast");

      assert.deepEqual(pizzaRestaurant.menus, {
        breakfast: [],
        lunch: [bbqPizza],
        dinner: [veggiePizza]
      });
      assert.equal(result, "No one is eating our Bacon and Eggs Pizza - it has been removed from the breakfast menu!");
    });

    it("should remove a different item from the menu to update it", function() {
      var pizzaRestaurant = createRestaurant("Sexy Pizza");
      var bbqPizza = {
        name: "BBQ Chicken Pizza",
        price: "12.49",
        type: "lunch"
      };

      var veggiePizza = {
        name: "Veggie Pizza",
        price: "11.49",
        type: "dinner"
      };

      var baconEggsPizza = {
        name: "Bacon and Eggs Pizza",
        price: "13.49",
        type: "breakfast"
      };

      addMenuItem(pizzaRestaurant, bbqPizza);
      addMenuItem(pizzaRestaurant, baconEggsPizza);
      addMenuItem(pizzaRestaurant, veggiePizza);

      var result = removeMenuItem(pizzaRestaurant, "Veggie Pizza", "dinner");

      assert.deepEqual(pizzaRestaurant.menus, {
        breakfast: [baconEggsPizza],
        lunch: [bbqPizza],
        dinner: []
      });
      assert.equal(result, "No one is eating our Veggie Pizza - it has been removed from the dinner menu!");
    });

    it("should only remove a menu item if it is on the menu", function() {
      var arepaRestaurant = createRestaurant("Quiero Arepas");
      var error = removeMenuItem(arepaRestaurant, "Mom's Spaghetti");

      assert.equal(error, "Sorry, we don't sell Mom's Spaghetti, try adding a new recipe!");
    });

  });
  describe("orderMenuItem", function() {
    it('should be a function', function() {
      assert.isFunction(orderMenuItem)
    })
    it('should pick a Menu Item', function() {
      var pizzaRestaurant = createRestaurant("Sexy Pizza");
      var bbqPizza = {
        name: "BBQ Chicken Pizza",
        price: "12.49",
        type: "lunch"
      };

      var veggiePizza = {
        name: "Veggie Pizza",
        price: "11.49",
        type: "dinner"
      };

      var baconEggsPizza = {
        name: "Bacon and Eggs Pizza",
        price: "13.49",
        type: "breakfast"
      };

      addMenuItem(pizzaRestaurant, bbqPizza);
      addMenuItem(pizzaRestaurant, baconEggsPizza);
      addMenuItem(pizzaRestaurant, veggiePizza);

      const order = orderMenuItem(pizzaRestaurant)

      const inBreakfast = pizzaRestaurant.menus.breakfast.includes(order)
      const inLunch = pizzaRestaurant.menus.lunch.includes(order)
      const inDinner = pizzaRestaurant.menus.dinner.includes(order)

      assert.isTrue(inBreakfast || inLunch || inDinner)
    })
    it('it should record in the restaurant taxesDue, revenue, and foodCost', function() {
      var pizzaRestaurant = createRestaurant("Sexy Pizza");
      var bbqPizza = {
        name: "BBQ Chicken Pizza",
        price: "12.49",
        type: "lunch"
      };

      var veggiePizza = {
        name: "Veggie Pizza",
        price: "11.49",
        type: "dinner"
      };

      var baconEggsPizza = {
        name: "Bacon and Eggs Pizza",
        price: "13.49",
        type: "breakfast"
      };

      addMenuItem(pizzaRestaurant, bbqPizza);
      addMenuItem(pizzaRestaurant, baconEggsPizza);
      addMenuItem(pizzaRestaurant, veggiePizza);

      const order = orderMenuItem(pizzaRestaurant)
      assert.equal(pizzaRestaurant.foodCost, 5)
      assert.equal(pizzaRestaurant.revenue, floorToCents(order.price))
      assert.closeTo(pizzaRestaurant.taxesDue, calculateTaxes(order.price), .01)
    })
    it('it should record these things for many orders', function() {
      var pizzaRestaurant = createRestaurant("Sexy Pizza");
      var bbqPizza = {
        name: "BBQ Chicken Pizza",
        price: "12.49",
        type: "lunch"
      };

      var veggiePizza = {
        name: "Veggie Pizza",
        price: "11.49",
        type: "dinner"
      };

      var baconEggsPizza = {
        name: "Bacon and Eggs Pizza",
        price: "13.49",
        type: "breakfast"
      };

      addMenuItem(pizzaRestaurant, bbqPizza);
      addMenuItem(pizzaRestaurant, baconEggsPizza);
      addMenuItem(pizzaRestaurant, veggiePizza);

      const order1 = orderMenuItem(pizzaRestaurant)
      const order2 = orderMenuItem(pizzaRestaurant)
      assert.equal(pizzaRestaurant.foodCost, 10)
      assert.equal(pizzaRestaurant.revenue, floorToCents(order1.price) + floorToCents(order2.price))
      assert.closeTo(pizzaRestaurant.taxesDue, (floorToCents(calculateTaxes(order1.price) + calculateTaxes(order2.price))), .011)
    })
    it('should be possible to find the restaurants total profit', function() {
      var pizzaRestaurant = createRestaurant("Sexy Pizza");
      var bbqPizza = {
        name: "BBQ Chicken Pizza",
        price: "12.49",
        type: "lunch"
      };

      var veggiePizza = {
        name: "Veggie Pizza",
        price: "11.49",
        type: "dinner"
      };

      var baconEggsPizza = {
        name: "Bacon and Eggs Pizza",
        price: "13.49",
        type: "breakfast"
      };

      addMenuItem(pizzaRestaurant, bbqPizza);
      addMenuItem(pizzaRestaurant, baconEggsPizza);
      addMenuItem(pizzaRestaurant, veggiePizza);

      const order1 = orderMenuItem(pizzaRestaurant)
      const financials1 = order1.price - 5 - calculateTaxes(order1.price)
      assert.closeTo(pizzaRestaurant.profit, floorToCents(financials1), .02)

      const order2 = orderMenuItem(pizzaRestaurant)
      const financials2 = order2.price - 5 - calculateTaxes(order2.price)
      assert.closeTo(pizzaRestaurant.profit, floorToCents(financials1 + financials2), .021)
    })
    it('should track the total taxesDue to the government', function() {
      var pizzaRestaurant = createRestaurant("Sexy Pizza");
      var bbqPizza = {
        name: "BBQ Chicken Pizza",
        price: "12.49",
        type: "lunch"
      };

      var veggiePizza = {
        name: "Veggie Pizza",
        price: "11.49",
        type: "dinner"
      };

      var baconEggsPizza = {
        name: "Bacon and Eggs Pizza",
        price: "13.49",
        type: "breakfast"
      };

      addMenuItem(pizzaRestaurant, bbqPizza);
      addMenuItem(pizzaRestaurant, baconEggsPizza);
      addMenuItem(pizzaRestaurant, veggiePizza);

      var tacoRestaurant = createRestaurant("Sexy Taco");
      var bbqTaco = {
        name: "BBQ Chicken Taco",
        price: "12.49",
        type: "lunch"
      };

      var veggieTaco = {
        name: "Veggie Taco",
        price: "11.49",
        type: "dinner"
      };

      var baconEggsTaco = {
        name: "Bacon and Eggs Taco",
        price: "13.49",
        type: "breakfast"
      };

      addMenuItem(tacoRestaurant, bbqTaco);
      addMenuItem(tacoRestaurant, baconEggsTaco);
      addMenuItem(tacoRestaurant, veggieTaco);
      pizzaRestaurant.cityTaxes = 0
      const order1 = orderMenuItem(tacoRestaurant)
      const order2 = orderMenuItem(tacoRestaurant)
      const order3 = orderMenuItem(pizzaRestaurant)
      const order4 = orderMenuItem(pizzaRestaurant)

      assert.equal(pizzaRestaurant.cityTaxes, tacoRestaurant.cityTaxes)

      assert.closeTo(pizzaRestaurant.cityTaxes, floorToCents(tacoRestaurant.taxesDue + pizzaRestaurant.taxesDue), .021)

      const cumulativeOrdersTax = calculateTaxes(order1.price) + calculateTaxes(order2.price) + calculateTaxes(order3.price) + calculateTaxes(order4.price)
      assert.closeTo(pizzaRestaurant.cityTaxes, floorToCents(cumulativeOrdersTax), .051)

    })
  })
});
