// Filename: router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'socketio',
    'views/paint/main'
    ], function($, _, Backbone, io, PaintView){
        var _ar;
        var _userId = null;
        var _socket;
        
        var AppRouter = Backbone.Router.extend({
            routes: {
                // Define some URL routes
                '/user': 'showUsers',
                'paint': 'showPaint',
                
                // Default
                '*actions': 'defaultAction'
            },
            
            showPaint: function(){
                if (_.isNull(_userId)) {
                    setTimeout(this.showPaint, 200);
                    return;
                }
                
                var paintView = new PaintView();
                paintView.render();
                paintView.initConnection(_userId, _socket);
                
            },
            defaultAction: function(actions){

                // We have no matching route, lets just log what the URL was
                $("#paintButton").on("click", function() {
                    _ar.navigate.call(this, "#paint", {trigger: true});
                });
            }
        });

        var initialize = function(){
            _ar = new AppRouter;
            
            console.log('initialize router');
            
            // open new socket
            _socket = io.connect('http://localhost:3000');
            _socket.emit('init', { });

            _socket.on('accepted', function (data) {
                _userId = data.userId;
                console.log("connection accepted");
            });
                        
            Backbone.history.start();
        };
        return {
            initialize: initialize
        };
});