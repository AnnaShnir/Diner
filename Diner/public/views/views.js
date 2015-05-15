
$(document).ready(function() {

	var DishView = Backbone.View.extend({
	    tagName: "div", // set the view to a new ul.
	    template: _.template($("#dishTemplate").html()), // set the template , ID for html tag is # , class is .

	    events: { 
	    	"click button#deleteButton": "deleteDish",
	    	"click button#editButton": "editDish",
	    	"click button#updateButton": "updateDish"
	    },

	    updateDish: function() {
	   
    		// grab name price and image from edit form
    		var newName = this.$("#editDishName" + this.model.id).val();
    		var newPrice = this.$("#editDishPrice" + this.model.id).val();
    		var newImage = this.$("#editDishImage" + this.model.id).val();
    		// update the model with those values locally
    		this.model.set({name: newName, price: newPrice, image_url: newImage});
    	
    		// persists the model in the database and triggers sync
    		this.model.save();

    	},

    	// renders edit form
    	editDish: function() {
      		// this.$("div.dish").hide();
      		this.$("span.editDishForm").show();
    	},

	  	// render the list of Dishes
	    render: function() {
	    	this.$el.html(this.template({dish: this.model.toJSON()})); //this$El - this. template with the dish from db pushed into it

	    	// console.log(this.$el);

	    	return this;
	    },

	    //delete dish:
		deleteDish: function() {
			this.model.destroy();

			// render: function() { 
		 //    	// render the model associated with this view
		 //    	this.$el.html(this.template({dish: this.model.toJSON()}));
		 //    	return this;
		 //    }
		}

  	});


	var MenuView = Backbone.View.extend({
		el: "ul#dishList",

		initialize: function() {
			this.listenTo(this.collection, "sync remove", this.render); //if there is a change made to the list of dishes in db it will listen to it and change accordingly
		},

		render: function() {
			var menu = this.$el;

			menu.html("");

	  		// iterate over each element in the collection and render a DishesView
	  		this.collection.each(function(dish) {
	  			menu.append(new DishView({model: dish}).render().$el); //each dish in the model refers to the one created with toJSON
	  		});

	  		return this;
	  	}
  	});

	// adds events to create dishAdd form
	var CreateDishView = Backbone.View.extend({
	    el: "#addDishForm", // bind to add dish form
	    events: {"click button#addDish": "createDish"},
	    
	    // creates a new Dish with data from form
	    createDish: function() {
	      // grab new name price and image link from form
	      var nameField = this.$("#newDishName");
	      var priceField = this.$("#newDishPrice");
	      var imageUrlField = this.$("#newDishImage");
	      var name = nameField.val();
	      var price = priceField.val();
	      var image_url = imageUrlField.val();

	      // add new dish to collection, save it to the database, and
	      // trigger sync event on collection
	      this.collection.create({name: name, price: price, image_url: image_url}, "sync");

	      // resets text fields
	      nameField.val("");
	      priceField.val("");
	      imageUrlField.val("");
	    } // END CreateDishView
	});

	// initialize a new Menuview and CreateDishView
	//  with the collection of menu
	new MenuView({collection: menu});
	new CreateDishView({collection: menu});



});