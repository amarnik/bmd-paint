(function(app){
	app.Bmd = {
		'common' : {},
		'router': undefined,
		'env': app.env,
		'utils':{},
		'sandbox': {},
        'socket': undefined
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
	        },
            socketio: {
                exports: 'io'
            }
	    },
	  paths: {
	  	underscore: '../libs/mvc/underscore',
	    backbone: '../libs/mvc/backbone',
	    text: '../app/text',  
	    domready: '../libs/require.jquery/domready',
	    commonmvc: '../app/common/mvc',
	    template: 'text!../app/common/templates.jhtml',
	    utils: '../app/common/utils',
	    router: './modules/' + app.env.module + '/router',
        socketio: '../libs/socket.io.min'
	  },
	  baseUrl: 'js/app/', 
	  urlArgs: "cache_key=" + app.Bmd.env.cachebuster ,
	
	});
	
	require(["jquery", "domready", "underscore", "backbone", "utils", "router", "commonmvc", "socketio", 'text!../app/common/templates.jhtml'], function($, domReady, _, Backbone, utils, Router, commonmvc, io, templates) {
	    
		// init 
		domReady(function() {
			// initialize global namespace
			app.Bmd = _.extend({
								'common' : _.extend( { models: {}, collections: {}, views: {}, templates: {} }, commonmvc ),
								'router': undefined,
								'env': app.env,
								'utils': utils,
								'sandbox': {}
							}, Backbone.Events );
			
			
			// init common mvc and templates
			app.Bmd.common = _.extend( { models: {}, collections: {}, views: {}, templates: {} }, commonmvc );
            
            // init app global data
            app.Bmd.data = {
                mode: (window.PhoneGap == true) ? 'MOBILE' : 'BROWSER'
            }
			
			// init templates
			$(templates).each(function() {	
						var template_id = $(this).attr('id');
						var element_type = $(this).attr('type');
						if ( template_id && element_type ){
							app.Bmd.common.templates[template_id] = _.template( $(this).html() );
						}
					});
			
            // connect the socket
            app.Bmd.socket = io.connect('http://localhost:3000');
            app.Bmd.socket.emit('init', { });

            app.Bmd.socket.on('accepted', function (data) {
                app.Bmd.data.userId = data.userId;
                console.log("connection accepted");
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
