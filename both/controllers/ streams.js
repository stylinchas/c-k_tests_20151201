
if (Meteor.isClient) {
  
  // get the data for the Streams templates
    Meteor.subscribe("streams");
  
    Meteor.subscribe("categories");
 
 
 // Stream Listing
  Template.streamsListingTmpl.helpers({
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
    },
    
    // get the category name and ID for each stream ito display on the stream listing - refactor this - cws
    // displays in stream listing
    category_name: function() {
      
      var theId = this.category// the current stream id
      // console.log('the ID is '+theId);
      
      //  Find the matching Category doc
      var thisCategoryDoc = Categories.find( {_id:theId} ).fetch();
      //console.log('doc '+thisCategoryDoc[0].name);
      
      // get the Category Name
      var catName = (thisCategoryDoc[0]['name']);
      return catName // the current stream name
    },
    category_id: function() {
      
      var theId = this.category// the current stream id
      // console.log('the ID is '+theId);
      
      //  Find the matching Category doc
      var thisCategoryDoc = Categories.find( {_id:theId} ).fetch();
      //console.log('doc '+thisCategoryDoc[0].name);
      
      // get the Category Name
      var catID = (thisCategoryDoc[0]['_id']);
      return catID // the current stream id
    }
  });
  
  // the Stream Listing events
  Template.streamsListingTmpl.events({ 
  
  ///CRUD stream links
  
    // New Stream button
     'click .add_stream button': function() {
        Router.go('/streamCreate');
    },
    
    // 'display articles by category' link 
    // user clicks on a stream title to see associated articles
    'click li span.title': function (event) {
      event.preventDefault(event);
      
      ////// get this session stuff out of the route - cws
      // put the stream's category name and ID in session variables
      //for use later
      // the  category ID
      var catID = $(event.target).parent().find('.category').data('cat-id');
      Session.set( 'currentCategoryId', catID );
      console.log("this cat id is "+String(catID));
      catID = String(catID);
      // the category name
      var theCat = Categories.find( {_id:catID} ).fetch(); 
      var catName = (theCat[0]['name']); // ugly -cws
      //console.log('this cat is '+catName);
      Session.set('currentCategoryName', catName);
      
      // put the Streamm title and id in session variables
      Session.set('currentStreamName',this.stream_title);
      Session.set('currentStreamId',this._id);
      
      Router.go('/articlesByStream/'+this._id); // the ID of the stream
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
    },
    // nav to Articles Listing
    'click .articles_link': function (event) {
      event.preventDefault(event);
      event.stopPropagation(event);
      Router.go('/articles');
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
      Router.go('/streams');
    },
    'click .streams_link': function(event) {
      // link back to stream listing
        event.preventDefault();
        Router.go('/streams');
    }
  });
  
}

