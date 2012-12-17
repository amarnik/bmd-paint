define( ['underscore', 'backbone' ], function( _, Backbone ) {
	var init = function(sandbox){
		
 		//var _color = "#000000", _socket, _userId, _lineId = 0;
        //var _pv;
        
        /**
		 * Toolbar view
		 */
        sandbox.views.Toolbar = Backbone.View.extend({
        	events: {
        		'click .color_swatch li': 'colorSelected'
        	},
		    initialize: function(){
				this.data = {
					colorSwatches : new sandbox.collections.ColorSwatchs([
						{ name: "Black", hex: "#000000" },
						{ name: "Green", hex: "#00FF00" },
						{ name: "Blue", hex: "#0000FF" },
					])
				};
            },
            render: function(){
            	console.log('rendering toolbar');
                $(this.el).html(sandbox.templates.ColorSwatch({ colors: this.data.colorSwatches.models} ));
                return this.$el;
			},
			
			/**
			 * event handlers
			 */
			colorSelected: function(e){
				var selectedColor, 
					target = $(e.target);
					
				$(".color_swatch li").removeClass("selected");
                target.addClass("selected");
                selectedColor = target.css("background-color");
                this.trigger("toolbar:colorSwatch:changed", {color: selectedColor});
                
                // testing global event bus
                Bmd.trigger('bmd:toolbar:colorSelected', {color:selectedColor});
			}
		});


		/**
		 * SVG Canvas view
		 */
		sandbox.views.Canvas = Backbone.View.extend({
			events: {
				"mousedown #paintSVG": "acceptDrawing",
				"touchmove #paintSVG": "acceptDrawing"		// TODO::TEST IT, not sure if it can capture the event. otherwise, need to move to initialize() method
			},
		    initialize: function(){
		    	this.data = {
					currentTool : 'line',
					currentColor: '#000000', //TODO:: change to color model
					mode: (window.PhoneGap==true)?'MOBILE':'BROWSER',
					currentLineId : 0,
					userId: 12		//TODO:: move to userModel
				};
				
            },
            render: function(){
                $(this.el).html(sandbox.templates.SVGCanvas({ } ));
                return this.$el;
			},
			setCurrentColor: function(color){
				//FIXME:: make it color model rather than hex
				this.data.currentColor = color;
			},
			acceptDrawing: function(e) {
				var self = this;
				if( self.data.mode == 'MOBILE' ){
					e.preventDefault();
                    var x = e.touches[0].pageX;
                    var y = e.touches[0].pageY;
					
					self.data.currentLineId++;

                    var data = { 
                        id: self.data.userId + "_" + self.data.currentLineId,
                        color: self.data.currentColor,
                        x: x,
                        y: y
                    }

                    //_socket.emit('newLine', data);
                    self.startNewLine( data );
                    
                    self.$("#paintSVG").on("touchmove", function(e) {
                        e.preventDefault();
                        console.log("x:" + e.touches[0].pageX);
                        var x = e.touches[0].pageX;
                        var y = e.touches[0].pageY;
						var data = { 
                            id: self.data.userId + "_" + self.data.currentLineId,
                            x: x,
                            y: y
                        }

                        //_socket.emit('continueLine', data);
                        self.continueLine( data );
                    });

                    self.$("#paintSVG").on("touchend", function( e ) {
                        self.$("#paintSVG").off("touchmove");
                    });
				} else {
					// browser draw
					var x = e.offsetX,
						y = e.offsetY;

                    console.log("start new line");                    
                    self.data.currentLineId++;

                    var data = { 
                        id: self.data.userId + "_" + self.data.currentLineId,
                        color: self.data.currentColor,
                        x: x,
                        y: y
                    }

                    //_socket.emit('newLine', data);
                    self.startNewLine( data );

                    $(window).on("mousemove", function(e) {
                        var x = e.offsetX;
                        var y = e.offsetY;
                        var data = { 
                            id: self.data.userId + "_" + self.data.currentLineId,
                            x: x,
                            y: y
                        }

                        //_socket.emit('continueLine', data);
                        self.continueLine( data );
                    });

                    $(window).on("mouseup", function( e ) {
                        $(window).off("mousemove");
                    });
				}
				
			},
			startNewLine: function( data ) {
                var circle = document.createElementNS( "http://www.w3.org/2000/svg", "circle" )
                circle.setAttribute("cx", data.x);
                circle.setAttribute("cy", data.y);
                circle.setAttribute("r", 2);
                circle.setAttribute("fill", data.color);
                this.$("#main").append(circle);
                
                
                var path = document.createElementNS( "http://www.w3.org/2000/svg", "path" )
                path.setAttribute("d", 'M' + data.x + ' ' + data.y);
                path.setAttribute("id", data.id);
                path.setAttribute("fill", "none");
                path.setAttribute("stroke", data.color);
                path.setAttribute("stroke-width", 2);
                this.$("#main").append(path);
            },
            continueLine: function( data ) {
                var line = $("#"+data.id);
                var pathString = line.attr("d");
                pathString += " L"+data.x+","+data.y;
                line.attr("d", pathString);
            }
		});
        
        
		/**
		 * Main Paint View
		 */
		sandbox.views.Paint = Backbone.View.extend({
		    initialize: function(){
				this.views = {
					toolbar : new sandbox.views.Toolbar(),
					canvas : new sandbox.views.Canvas()
				};
				
				// listen child controls' events
				this.views.toolbar.on( "toolbar:colorSwatch:changed" , this.changeColorSwatch, this );
				this.listenTo(Bmd, 'bmd:toolbar:colorSelected', function(options){
					alert('Yay!!!, this is global event from event bus.  And color is::' + options.color );
				})
            },
            render: function(){
            	// render layout
                $(this.el).html( sandbox.templates.Paint({ }) );
                
                // render Children views
                this.$('.toolbar').html( this.views.toolbar.render() );
                this.$('.painting-main').html( this.views.canvas.render() );
               
                return this.$el;
            },
            
            /**
			 * event handlers
			 */
			changeColorSwatch: function(options){
				var selectedColor = options.color;
				this.views.canvas.setCurrentColor(selectedColor);
			},
			
			
            initConnection: function(userId, socket) {
            	var self = this;
            	
            	// DO IT LATER
            	/*
                // start drawing new line from other clients
                socket.on('newLine', function (data) {    
                    self.views.canvas.startNewLine( data );
                });
                
                // continue to draw line from other clients
                socket.on('continueLine', function (data) {    
                    self.views.canvas.continueLine( data );
                });
                */
                                    

            }
            
        });
		
		
		
		
	};		
	return init;
});

        
    
        
