var DishCollection = Backbone.Collection.extend({
  model: Dish,
  url: '/dishes'
})

var menu = new DishCollection();
menu.fetch();