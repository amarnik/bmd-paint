(function(app){
	app.Bmd = {
		'common' : {},
		'router': undefined,
		'env': app.env,
		'modules':{},
		'utils':{}
	};
	
	require.config({
	    shim: {
	        underscore: {
	            exports: '_'
	        },
	        backbone: {
	            deps: ["underscore", "jquery"],
	            exports: "Backbone"
	        },
	        commonmvc: {
	        	deps: ["underscore", "jquery", "backbone"]        	
	        },
	        utils: {
	        	deps: ["underscore", "jquery"]
	        }
	    },
	  paths: {
	  	underscore: '/js/libs/mvc/underscore',
	    backbone: '/js/libs/mvc/backbone',
	    text: '/js/app/text',  
	    domready: '/js/libs/require.jquery/domready',
	    commonmvc: '/js/app/common/mvc',
	    template: 'text!/js/app/common/templates.jhtml',
	    utils: '/js/app/common/utils',
	    router: './modules/' + app.env.module + '/router'
	  },
	  baseUrl: '/js/app/', 
	  urlArgs: "cache_key=" + app.Bmd.env.cachebuster ,
	
	});
	
	require(["jquery", "domready", "underscore", "backbone", "utils", "router", "commonmvc", 'text!/js/app/common/templates.jhtml'], function($, domReady, _, Backbone, utils, Router, commonmvc, templates) {
	    
		// init 
		domReady(function() {
			// create env initialiation
			app.Bmd.utils = utils;
			
			// init common mvc and templates
			app.Bmd.common = _.extend( { models: {}, collections: {}, views: {}, templates: {} }, commonmvc );
			
			// init templates
			$(templates).each(function() {	
						var template_id = $(this).attr('id');
						var element_type = $(this).attr('type');
						if ( template_id && element_type ){
							app.Bmd.common.templates[template_id] = _.template( $(this).html() );
						}
					});
			
			
			// init Router
			app.Bmd.router = new Router();
			Backbone.history.start();
			
			// init global events
			$(window).on('resize', function(){
				
			});
			
			$(document).on('click', function(e){
				
			});
		
		});
	});

})(this);