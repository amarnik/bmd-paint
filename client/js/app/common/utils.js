define( ['underscore', 'jquery', 'domready' ], function( _, $, domReady ) {
	var utils = {
		/**
		 * moduleResources - make sure all resources are loaded and assigned into sandbox
		 * @param sandbox - sandbox where all the loaded resources should be in
		 * @param moduleFiles - array of sandbox enabled CommonJS Module
		 * @param templateFiles - array of template files eg. 'text!/js/xxxx'
		 */
		load: function( sandbox, moduleFiles, templateFiles, callback, context ) {
			//ensure sandbox structure
			sandbox = _.defaults( sandbox, { views:{}, models:{}, collections:{}, templates:{}} );
			
			// prepare files to load
			var templatesLen = templateFiles.length,
				filesToLoad = moduleFiles.concat( templateFiles || [] );
			
			console.log( filesToLoad );
			require( filesToLoad , function( ) {
				var args = Array.prototype.slice.call(arguments),
		    		common_modules_end = filesToLoad.length - templatesLen;
		    		
	    		domReady(function() {
		    		// load modules into sandbox
		    		var i=0, mod;
		    		for(var i=0;i<common_modules_end;i++){
						mod = args[i];
						if(mod){
							mod(sandbox);
						}						
					}
					
					// load templates into sandbox
					for(i=common_modules_end, len=filesToLoad.length;i<len;i++){
						var templates = args[i];
						$(templates).each(function() {	
							var template_id = $(this).attr('id');
							var element_type = $(this).attr('type');
							if ( template_id && element_type ){
								sandbox.templates[template_id] = _.template( $(this).html() );
							}
						});			
					}
					console.log( sandbox );
					if(callback){
						context = context || window;
						callback.call(context);//default context is window
					}
				});
			});

			
		
			
		}	
	};
	
	return utils;
});