// JavaScript Document
//for removing all docs in a collection


if (Meteor.isServer) {

  Meteor.startup(function() {

    return Meteor.methods({

      removeAll: function() {

        // add collection name here
        // return Posts.remove({});

      }

    });

  });

}

// Meteor.call('removeAll');
