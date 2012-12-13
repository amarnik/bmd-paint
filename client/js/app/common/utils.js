define( ['underscore', 'jquery' ], function( _, $ ) {
	var utils = {
		/**
		 * moduleResources - make sure all resources are loaded and assigned into sandbox
		 * 
		 */
		moduleResources: function( sandbox, moduleFiles, templateFiles ) {
			/*

			var filesToLoad=[], templatesLen = templateFiles.length;
			filesToLoad = moduleFiles.concat(templateFiles);
			
			
			
			require( filesToLoad , function( ) {
	    		var args = Array.prototype.slice.call(arguments),
	    			common_modules_end = templatesLen-1;
	    		
	    		for(var i=0;i<common_modules_end;i++){
					var module = args[i];
					module.loader(sandbox);
				}
				
				var modules = {};
				// init modules into sandbox 
				domReady(function() {
					sandbox = _.extend( sandbox, { models: {}, collections: {}, views: {}, templates: {} }, modules );
					
					
					 
				
				});
			});

			
			*/
			
		}	
	};
	
	return utils;
});