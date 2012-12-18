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
	  	'profile_model': './modules/canvas/models/profile',
	    'profile_collection': './modules/canvas/collections/profile',
	    'toolbar_view': './modules/canvas/views/toolbar',
	    
	    'canvas_model': './modules/canvas/models/canvas',
	    'canvas_collection': './modules/canvas/collections/canvas',
	    'canvas_view': './modules/canvas/views/canvas',
        
        'line_model': './modules/canvas/models/line',
	    'line_collection': './modules/canvas/collections/line',
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
                alert('browse');
                Bmd.utils.load(Bmd.sandbox, ['friends_model', 'profile_collection','canvas_model', 'canvas_collection', 'canvas_view'], ['text!./modules/canvas/templates/paint.jhtml', 'text!./modules/canvas/templates/canvas.jhtml'], function(){
					// render the main view, if we need to load initial data, load here and pass it to view
					var paint = new Bmd.sandbox.views.Paint();
					$("#container").html( paint.render() );
					
				}, this);
			},
			
			index: function(){
				// load only files related to current route.
				Bmd.utils.load(Bmd.sandbox, ['profile_model', 'profile_collection', 'canvas_model', 'canvas_collection', 'canvas_view', 'line_model', 'line_collection'], ['text!./modules/canvas/templates/paint.jhtml', 'text!./modules/canvas/templates/canvas.jhtml'], function(){
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
