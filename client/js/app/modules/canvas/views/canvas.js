define( function( ) {
	var init = function(sandbox){
		
 		//var _color = "#000000", _socket, _userId, _lineId = 0;
        //var _pv;
        
        /**
		 * Toolbar view
		 */
        sandbox.views.Toolbar = Backbone.View.extend((function(){
            // private data/methods
            var _this;
            
            var _doSomethings = function(){
                
                
                
            };
            
            
            //expose public attr
            return {
            
        	events: {
        		'click .color_swatch li': 'colorSelected',
                'touchstart .color_swatch li': 'colorSelected'
        	},
		    initialize: function(){
                _this = this;
				this.data = {
					colorSwatches : new sandbox.collections.ColorSwatchs([
						{ name: "Black", hex: "#000000" },
                        { name: "Red", hex: "#FF0000" },
						{ name: "Green", hex: "#00FF00" },
						{ name: "Blue", hex: "#0000FF" }
					]),
                    lineThickness: 2,
                    lineOpacity: 1
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
                selectedColor = target.data('id');
                    //target.css("background-color");
                //var selectedColorModel = this.data.colorSwatches.where({hex:selectedColor});
                var selectedColorModel = this.data.colorSwatches.get(selectedColor);
                console.log(selectedColorModel);
                
                this.trigger("toolbar:colorSwatch:changed", {color: selectedColor});
                
                // testing global event bus
                Bmd.trigger('bmd:toolbar:colorSelected', {color:selectedColor});
			}
		};
        }()) );


		/**
		 * SVG Canvas view
		 */
		sandbox.views.Canvas = Backbone.View.extend({
			events: {
				//"mousedown #paintSVG": "acceptDrawing",
				//"touchmove #paintSVG": "acceptDrawing"		// TODO::TEST IT, not sure if it can capture the event. otherwise, need to move to initialize() method
			},
		    initialize: function(){
                var self = this;
                
		    	this.data = {
					currentTool : 'line',
					currentColor: '#000000', //TODO:: change to color model
					currentLineId : 0,
                    lineThickness: 2,
                    lineOpacity: 1,
                    lines : new sandbox.collections.Lines()
				};
                
                this.data.lines.on("add", this.drawNewLine, this);
                this.data.lines.on("change", this.drawUpdateLine, this);
                
                Bmd.socket.on('newLine', function(data) { self.startNewLine(data) });
                Bmd.socket.on('continueLine', function(data) { self.continueLine(data) });
				
            },
            render: function(){
                var self = this;
                
                $(this.el).html(sandbox.templates.SVGCanvas({ } ));
                
                // atttach events
                if( Bmd.data.mode == 'MOBILE' ){
                    console.log("MOBILE - ADD TOUCH EVENT");
                    $("#paintPaper", $(this.el)).on('touchstart', function( e ) {
                        console.log("touchstart");
                        self.acceptDrawing.call(self, e.originalEvent);
                    });
                    
                } else {
                    $("#paintPaper", $(this.el)).on('mousedown', function( e ) {
                        console.log("mousedown");
                        self.acceptDrawing.call(self, e);
                    });
                }
                
                return this.$el;
			},
			setCurrentColor: function(color){
				//FIXME:: make it color model rather than hex
				this.data.currentColor = color;
			},
			acceptDrawing: function(e) {
				var self = this;

                self.data.currentLineId++;
                var lineId = Bmd.data.userId + "_" + self.data.currentLineId;
                
				if( Bmd.data.mode == 'MOBILE' ){

					e.preventDefault();

                    var x = e.touches[0].pageX-$('#paintSVG').offset().left;
                    var y = e.touches[0].pageY-$('#paintSVG').offset().top;
                    
                    $("#paintPaper").on("touchmove", function(e) {
                        //e.originalEvent.preventDefault();
                        console.log("x:" + e.originalEvent.touches[0].pageX);
                        
                        var x = e.originalEvent.touches[0].pageX-$('#paintSVG').offset().left;
                        var y = e.originalEvent.touches[0].pageY-$('#paintSVG').offset().top;
                        
						var data = { 
                            id: lineId,
                            x: x,
                            y: y
                        }

                        Bmd.socket.emit('continueLine', data);
                        self.continueLine( data );
                    });

                    $("#paintPaper").on("touchend", function( e ) {
                        $("#paintPaper").off("touchmove");
                    });
                    
				} else {
					// browser draw
                    if(e.offsetX==undefined) // this works for Firefox
                    {
                        x = e.pageX-$('#paintSVG').offset().left;
                        y = e.pageY-$('#paintSVG').offset().top;
                    }             
                    else
                    {
                        x = e.offsetX;
                        y = e.offsetY;
                    }
                    

                    $(window).on("mousemove", function(e) {
                        
                        if(e.offsetX==undefined) // this works for Firefox
                        {
                            x = e.pageX-$('#paintSVG').offset().left;
                            y = e.pageY-$('#paintSVG').offset().top;
                        }             
                        else
                        {
                            x = e.offsetX;
                            y = e.offsetY;
                        }
                        
                        
                        var data = { 
                            id: lineId,
                            x: x,
                            y: y
                        }

                        Bmd.socket.emit('continueLine', data);
                        self.continueLine( data );
                    });

                    $(window).on("mouseup", function( e ) {
                        $(window).off("mousemove");
                    });
				}
                
                var data = { 
                    id: lineId,
                    color: self.data.currentColor,
                    stroke: self.data.lineThickness,
                    opacity: self.data.lineOpacity,
                    x: x,
                    y: y
                }

                Bmd.socket.emit('newLine', data);
                self.startNewLine( data );

			},
			startNewLine: function( data ) {
                
                var line = new sandbox.models.Line({
                    id: data.id,
                    d: 'M' + data.x + ' ' + data.y,
                    color: data.color,
                    stroke: data.stroke,
                    opacity: data.opacity,
                    x: data.x,
                    y: data.y
                });
                
                this.data.lines.add(line);

            },
            continueLine: function( data ) {
                var line = this.data.lines.get(data.id);
                
                var newPathString = line.get('d') + " L"+data.x+","+data.y;
                line.set("d", newPathString);
            },
            drawNewLine: function( line ) {
                
                var circle = document.createElementNS( "http://www.w3.org/2000/svg", "circle" )
                circle.setAttribute("cx", line.get('x'));
                circle.setAttribute("cy", line.get('y'));
                circle.setAttribute("r", line.get('stroke') / 2);
                circle.setAttribute("opacity", line.get('opacity'));
                circle.setAttribute("fill", line.get('color'));
                this.$("#main").append(circle);
                
                
                var path = document.createElementNS( "http://www.w3.org/2000/svg", "path" )
                path.setAttribute("d", line.get('d'));
                path.setAttribute("id", line.get('id'));
                path.setAttribute("fill", "none");
                path.setAttribute("stroke", line.get('color'));
                path.setAttribute("stroke-width", line.get('stroke'));
                path.setAttribute("opacity", line.get('opacity'));
                this.$("#main").append(path);
            },
            drawUpdateLine: function(line) {
                var $line = $("#"+line.get('id'));
                $line.attr("d", line.get('d'));
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
				
                this.data = {
                    // userprofile: new sandbox.models.Profile()
                };
                
				// listen child controls' events
				this.views.toolbar.on( "toolbar:colorSwatch:changed" , this.changeColorSwatch, this );
				this.listenTo(Bmd, 'bmd:toolbar:colorSelected', function(options){
					console.log('Yay!!!, this is global event from event bus.  And color is::' + options.color );
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
            
            handlers: {
                
                
            },
            
            /**
			 * event handlers
			 */
			changeColorSwatch: function(options){
				var selectedColor = options.color;
				this.views.canvas.setCurrentColor(selectedColor);
			},
            changeLineThickness: function(options){
				
			},
            changeLineOpacity: function(options){
				
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

        
    
        
