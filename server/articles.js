Meteor.publish("articles", function() {
  return Articles.find();
});// JavaScript Document