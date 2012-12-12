define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'models/user'
], function(_, Backbone, UserModel){
  var UserCollection = Backbone.Collection.extend({
    model: UserModel
  });
  // You don't usually return a collection instantiated
  return UserCollection;
});