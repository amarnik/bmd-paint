define( ['underscore', 'backbone' ], function( _, Backbone ) {
	
	// define all the required CommonJS file for this module
	require.config({
	    shim: {
	    	profile_model:{
	    		
	    	},
	        profile_collection: {
	            deps: ['profile_model']
	        },
	        toolbar: {
	            
	        }
	    },
	  paths: {
	  	'profile_model': '/js/app/modules/canvas/models/profile',
	    'profile_collection': '/js/app/modules/canvas/collections/profile',
	    'toolbar_view': '/js/app/modules/canvas/views/toolbar'
	  } //,
	  //urlArgs: "cache_key=" + app.Bmd.env.cachebuster ,
	
	});


	
	var Router = Backbone.Router.extend({
			routes: {
				'': 'index',
				'!/draw': 'draw',
				'!/catalog': 'catalog',
				'!/subscription': 'subscription'
			},
			initialize: function(){
				console.log('init router');
			},

			index: function(){
				$("#current_page").html( 'OK… this is index ' );
			},
			draw: function(){
				$("#current_page").html( 'OK… this is draw ' );
			},
			
			catalog: function(){
				// load only files related to current route.
				Bmd.utils.load(Bmd.sandbox, ['profile_model', 'profile_collection','toolbar_view'], ['text!/js/app/modules/canvas/templates/assets.jhtml', 'text!/js/app/modules/canvas/templates/canvas.jhtml'], function(){
					// at this point, all the loaded modules and templates are in sandbox
					$("#current_page").html( 'OK… this is catalog ' );
				}, this);
				
			},
			
			subscription: function(page){
				
				$("#current_page").html( 'OK… this is subscription ' );
			}
		});
		
    return Router;
});
