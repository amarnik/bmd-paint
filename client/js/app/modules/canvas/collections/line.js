define( ['underscore', 'backbone' ], function( _, Backbone ) {
	var init = function(sandbox){
		// add all the views
		sandbox.collections.ColorSwatchs = Backbone.Collection.extend({
			model: sandbox.models.Color
		});
		
		
		// more view here ...
		
		
	};		
	return init;
});
