define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'models/color_swatch'
], function(_, Backbone, ColorModel){
  var ColorSwatchCollection = Backbone.Collection.extend({
    model: ColorModel
  });
  // You don't usually return a collection instantiated
  return ColorSwatchCollection;
});