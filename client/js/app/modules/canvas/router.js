define( ['underscore', 'backbone' ], function( _, Backbone ) {
	
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
				$("#current_page").html( 'OK… this is catalog ' );
			},
			
			subscription: function(page){
				
				$("#current_page").html( 'OK… this is subscription ' );
			}
		});
		
    return Router;
});		