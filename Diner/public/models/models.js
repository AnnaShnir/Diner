var Dish = Backbone.Model.extend({
	urlRoot: '/dishes',

	initialize: function() {
		console.log("another bloody dish!");
		this.on('change:name', function() {   //test to change dish
			console.log("Make that change")
		});
	},

	defaults: {
		name: "bloody mess",
		price: "45",
		image_url: "http://blogs.independent.co.uk/wp-content/uploads/2013/07/IMG_0352.jpg"
	},

	speak: function() {
		console.log("I'd rather go hungry");
	}
});