// Filename: models/user
define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var UserModel = Backbone.Model.extend({
    defaults: {
      name: "Harry Potter",
      email: "harryp@hogwart.com"
    }
  });
  // Return the model for the module
  return UserModel;
});