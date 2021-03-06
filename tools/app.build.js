/**
 * usage : node ./r.js -o ./app.build.js  
 * @require nodejs
 **/

{
    appDir: '../client',
    baseUrl: 'js/app/',
    paths: {
    	jquery: '../libs/require.jquery/require-jquery',
        underscore: '../libs/mvc/underscore',
	    backbone: '../libs/mvc/backbone',
	    socketio: '../libs/socket.io.min',
	    text: 'text',  
	    domready: '../libs/require.jquery/domready',
	    
	    commonmvc: 'common/mvc',
	    utils: 'common/utils',
	    router: 'modules/canvas/router',
	    
	  },
	
    dir: '../client.prod',
    //Inlines the text for any text! dependencies, to avoid the separate
    //async XMLHttpRequest calls to load those dependencies.
    inlineText: true,
    stubModules: ['text'] ,
    optimizeAllPluginResources: false,
    modules: [
        //First set up the common build layer.
        {
            //module names are relative to baseUrl
            name: 'main',
            //List common dependencies here. Only need to list
            //top level dependencies, "include" will find
            //nested dependencies.
            include: [
            	'underscore',
	    		'backbone',
            	'domready',
	    		'commonmvc',
	    		'utils',
            ],
            exclude:['jquery', 'router' ,'socketio'   ]
        } 

    ]
    
}