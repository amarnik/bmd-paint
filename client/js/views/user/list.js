// Filename: views/user/list
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/user',
  'text!/templates/user/list.html'
], function($, _, Backbone, UserCollection, userListTemplate){
  var UserListView = Backbone.View.extend({
    el: $('#container'),
    initialize: function(){
      this.collection = new UserCollection();
      this.collection.add({name: "Peter Pan", email: "peterp@gmail.com"});
      // Compile the template using Underscores micro-templating
      var compiledTemplate = _.template( userListTemplate, { users: this.collection.models } );
      this.$el.html(compiledTemplate);
    }
  });
  // Our module now returns our view
  return UserListView;
});