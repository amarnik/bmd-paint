define( function( ) {
	var init = function(sandbox){
		// add all the views
		sandbox.models.Line = Backbone.Model.extend({
            idAttribute:'id',
			defaults: {
		      	id: "0",
		    	d: "M0,0",
                color: '#000',
                stroke: 2,
                opacity: 1,
                x: 0,
                y: 0
		    }
		});
		
		
		// more view here ...
		
		
	};		
	return init;
});

