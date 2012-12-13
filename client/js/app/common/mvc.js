define( ['underscore', 'backbone' ], function( _, Backbone ) {
	var exports = {models:{}, views:{}, collections:{}};
	
	// featured List collection
	var DialogModel = exports.models.DialogModel = Backbone.Model.extend({
            defaults: {
                "view": "defaultView"
            }
    });
    
    // featured List collection
	var DialogView = exports.views.DialogModel = Backbone.View.extend({
            
    });
    
    return exports;
});