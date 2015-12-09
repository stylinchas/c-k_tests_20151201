// JavaScript Document
//for removing all docs in a collection


if (Meteor.isServer) {
  //Streams.remove({'stream_title':'Test Stream'})
  Meteor.startup(function() {

    return Meteor.methods({

      removeAll: function() {

        // add collection name here
        // // return Categories.remove({_id:"GuyFhanRA8httRiQb"});
        //return Posts.remove({});

      }

    });

  });

}


