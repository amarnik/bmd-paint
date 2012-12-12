// Filename: views/paint/main
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/color_swatch',
    'text!../../../templates/paint/svg.html',
    'text!../../../templates/paint/color_swatch.html'
    ], function($, _, Backbone, ColorSwatchCollection,paintSVGTemplate, paintColorSwatchTemplate){
        var _color = "#000000", _socket, _userId, _lineId = 0;
        var _pv;
        
    
        var PaintView = Backbone.View.extend({
            el: $('#container'),
            initialize: function(){
                _pv = this;
                console.log("views/paint/main init");
            },
            render: function(){
                this.collection = new ColorSwatchCollection();
                this.collection.add({
                    name: "Black", 
                    hex: "#000000"
                });
                this.collection.add({
                    name: "Red", 
                    hex: "#FF0000"
                });
                this.collection.add({
                    name: "Green", 
                    hex: "#00FF00"
                });
                this.collection.add({
                    name: "Blue", 
                    hex: "#0000FF"
                });
      
                // Compile the template using Underscores micro-templating
                var compiledColorSwatchTemplate = _.template( paintColorSwatchTemplate, {
                    colors: this.collection.models
                } );
                this.$el.html(compiledColorSwatchTemplate);
      
                var compiledSVGTemplate = _.template( paintSVGTemplate, { } );
                this.$el.append(compiledSVGTemplate);
      
                $(".color_swatch li:first").addClass("selected");
                
                $(".color_swatch li").on("click", function() {
                    $(".color_swatch li").removeClass("selected");
                    
                    $(this).addClass("selected");
                    _color = $(this).css("background-color");
                    console.log("selected new color: "+ _color);
                });
            },
            initConnection: function(userId, socket) {
                console.log("initConnection called");
                console.log($("#main"));
                _userId = userId;
                _socket = socket;
                
                // start drawing new line from other clients
                socket.on('newLine', function (data) {    
                    _pv.startNewLine( data );
                });
                
                // continue to draw line from other clients
                socket.on('continueLine', function (data) {    
                    _pv.continueLine( data );
                });
                
                if ( !window.PhoneGap) {
                    // start its own new line
                    $("#paintSVG").on("mousedown", function(e) {

                        var x = e.offsetX;
                        var y = e.offsetY;

                        console.log("start new line");                    
                        _lineId++;

                        var data = { 
                            id: _userId + "_" + _lineId,
                            color: _color,
                            x: x,
                            y: y
                        }

                        _socket.emit('newLine', data);
                        _pv.startNewLine( data );

                        $(window).on("mousemove", function(e) {
                            var x = e.offsetX;
                            var y = e.offsetY;

                            var data = { 
                                id: _userId + "_" + _lineId,
                                x: x,
                                y: y
                            }

                            _socket.emit('continueLine', data);
                            _pv.continueLine( data );
                        });

                        $(window).on("mouseup", function( e ) {
                            $(window).off("mousemove");
                        });
                    });
                } else {
            
                    $("#paintSVG").on("touchstart", function(e) {
                        e.preventDefault();

                        var x = e.touches[0].pageX;
                        var y = e.touches[0].pageY;

                        console.log("start new line");                    
                        _lineId++;

                        var data = { 
                            id: _userId + "_" + _lineId,
                            color: _color,
                            x: x,
                            y: y
                        }

                        _socket.emit('newLine', data);
                        _pv.startNewLine( data );

                        $("#paintSVG").on("touchmove", function(e) {
                            e.preventDefault();
                            console.log("x:" + e.touches[0].pageX);
                            var x = e.touches[0].pageX;
                            var y = e.touches[0].pageY;

                            var data = { 
                                id: _userId + "_" + _lineId,
                                x: x,
                                y: y
                            }

                            _socket.emit('continueLine', data);
                            _pv.continueLine( data );
                        });

                        $("#paintSVG").on("touchend", function( e ) {
                            $("#paintSVG").off("touchmove");
                        });
                    });
                }
                    

            },
            startNewLine: function( data ) {
                
                
                var circle = document.createElementNS( "http://www.w3.org/2000/svg", "circle" )
                circle.setAttribute("cx", data.x);
                circle.setAttribute("cy", data.y);
                circle.setAttribute("r", 2);
                circle.setAttribute("fill", data.color);
                
                $("#main").append(circle);
                
                
                var path = document.createElementNS( "http://www.w3.org/2000/svg", "path" )
                path.setAttribute("d", 'M' + data.x + ' ' + data.y);
                path.setAttribute("id", data.id);
                path.setAttribute("fill", "none");
                path.setAttribute("stroke", data.color);
                path.setAttribute("stroke-width", 2);
                
                $("#main").append(path);
                
            },
            continueLine: function( data ) {
                
                var line = $("#"+data.id);
                var pathString = line.attr("d");
                
                pathString += " L"+data.x+","+data.y;
                line.attr("d", pathString);
                
            }
        });
        // Our module now returns our view
        return PaintView;
    });