// Filename: models/color_swatch
define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var ColorSwatchModel = Backbone.Model.extend({
    defaults: {
      name: "Black",
      hex: "000000"
    }
  });
  // Return the model for the module
  return ColorSwatchModel;
});