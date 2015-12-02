
if (Meteor.isClient) {
  
  // get the data for the Streams templates
  Meteor.subscribe("streams");
  
  
  Template.streamsTmpl.helpers({
    //  only display streams by this user
    streams: function() {
      
      // get user ID to compare with stream creatorID 
      var thisUserID = Meteor.userId();
      
      //  select streams created by this user
      var thisUsersStreams = Streams.find({creatorID:thisUserID}).fetch();
      //console.log(theStreams)
      return thisUsersStreams; 
    },
    
    userID: function() {
      return Meteor.userId();
    }
  });
  
  // the Stream Listing events
  Template.streamsTmpl.events({ 
  
  ///CRUD stream links
  
    // New Stream button
     'click .add_stream button': function() {
        Router.go('/streamCreate');
    },
    // display stream link
    'click li span.title': function (event) {
      event.preventDefault(event);
      Router.go('/streamDisplay/'+this._id);
    },
    // Update stream link
    'click a.update_stream': function (event) {
      event.preventDefault(event);
      event.stopPropagation(event);
      Router.go('/streamUpdate/'+this._id);
    },
    // Delete stream link  - needs warnings
    'click a.delete_stream': function (event) {
		  event.preventDefault();
      event.stopPropagation();
      
      // confirm delete
      var theId = this._id // for use by modal
      BootstrapModalPrompt.prompt({
        
        title: "Confirm Stream Delete",
        content: "OK to permanently delete this stream?",
        btnOkText: "Delete Stream", // doesn't work!
        btnDismissText: 'No, Cancel Delete'
          
      }, function(result) {
        if (result) {
          Streams.remove(theId);
        }
        else {
          
        }
      });
    }
  });
  
  //have this below also - refactor
  Template.streamCreateTmpl.helpers({ 
  categories_select:function() {
    
      return Categories.find().map(function (cat) {
         return {label: cat.name, value: cat._id};
        });
  },
  });
  
  Template.streamCreateTmpl.events({ 
    //submit new stream
   'submit': function () {
      Router.go('/streams');
      console.log(this._id);
    },
    // link back to stream listing
    'click .streams_link': function(event) {
      event.preventDefault();
      Router.go('/streams');
    }
  });
  
   //have this above also - refactor
   Template.streamUpdateTmpl.helpers({ 
   categories_select:function() {
      return Categories.find().map(function (cat) {
       return {label: cat.name, value: cat._id};
      });
    }
   });
   
  Template.streamUpdateTmpl.events({
    //submit updated stream 
    'submit': function () {
       alert('ok'); 
      Router.go('/streams');
    },
    'click .streams_link': function(event) {
      // link back to stream listing
        event.preventDefault();
        Router.go('/streams');
    }
  });
  
}

