define( ['underscore', 'backbone' ], function( _, Backbone ) {
	var init = function(sandbox){
		// add all the views
		sandbox.collections.Lines = Backbone.Collection.extend({
			model: sandbox.models.Line
		});
		
		
		// more view here ...
		
		
	};		
	return init;
});
