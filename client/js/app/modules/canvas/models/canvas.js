define( function( ) {
	var init = function(sandbox){
		// add all the views
		sandbox.models.Color = Backbone.Model.extend({
			defaults: {
		      	name: "Black",
		    	hex: "000000"
		    }
		});
		
		
		// more view here ...
		
		
	};		
	return init;
});

