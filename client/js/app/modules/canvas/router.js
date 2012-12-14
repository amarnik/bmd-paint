define( ['underscore', 'backbone' ], function( _, Backbone ) {
	
	// define all the required CommonJS file for this module
	require.config({
	    shim: {
	    	profile_model:{},
	        profile_collection: {
	            deps: ['profile_model']
	        },
	        
	        canvas_models: {},
	        canvas_collections: {
	        	deps:['canvas_models']
	        },
	        canvas_views: {
	        	deps:['canvas_models', 'canvas_collections']
	        },
	        toolbar: {
	            
	        }
	    },
	  paths: {
	  	'profile_model': '/js/app/modules/canvas/models/profile',
	    'profile_collection': '/js/app/modules/canvas/collections/profile',
	    'toolbar_view': '/js/app/modules/canvas/views/toolbar',
	    
	    'canvas_models': '/js/app/modules/canvas/models/canvas',
	    'canvas_collections': '/js/app/modules/canvas/collections/canvas',
	    'canvas_views': '/js/app/modules/canvas/views/canvas'
	  } //,
	  //urlArgs: "cache_key=" + app.Bmd.env.cachebuster ,
	
	});


	
	var Router = Backbone.Router.extend({
			routes: {
				'': 'index',
				'!/browse': 'browse',
				'!/subscription': 'subscription'
			},
			initialize: function(){
				console.log('init router');
			},

			 
			browse: function(){
				// browse all the drawing submitted by users
			},
			
			index: function(){
				// load only files related to current route.
				Bmd.utils.load(Bmd.sandbox, ['profile_model', 'profile_collection','canvas_models', 'canvas_collections', 'canvas_views'], ['text!/js/app/modules/canvas/templates/paint.jhtml', 'text!/js/app/modules/canvas/templates/canvas.jhtml'], function(){
					// render the main view, if we need to load initial data, load here and pass it to view
					var paint = new Bmd.sandbox.views.Paint();
					$("#container").html( paint.render() );
					
				}, this);
				
			},
			
			subscription: function(page){
				
				console.log( 'OK… this is subscription ' );
			}
		});
		
    return Router;
});
