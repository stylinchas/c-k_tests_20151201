// JavaScript Document
if (Meteor.isClient) {
  
  // get the data for the Articles templates
  
  Meteor.subscribe("articles"); 
  Meteor.subscribe("categories");
  
  
  
  
  Template.articlesTmpl.helpers({
    
    // get user's articles
    articles: function() {
      
      // get user ID to compare with article creator ID 
      var thisUserID = Meteor.userId();
      
      //  only display articles by this user
      //  i.e. where article creator ID matches the user ID
      var theArticles = Articles.find({creatorID:thisUserID}).fetch();
      return theArticles;
    },
    userID: function() {
      return Meteor.userId();
    }
  });
  
  // the Article Listing events
  Template.articlesTmpl.events({ 
  
  ///CRUD article links
  
    // New Article button
     'click .add_article button': function() {
        Router.go('/articleCreate');
    },
    // display article link
    'click li span.title': function (event) {
      event.preventDefault(event);
      Router.go('/articleDisplay/'+this._id);
    },
    // Update article link
    'click a.update_article': function (event) {
      event.preventDefault(event);
      event.stopPropagation(event);
      Router.go('/articleUpdate/'+this._id);
    },
    // Delete article link  - needs warnings
    'click a.delete_article': function (event) {
		  event.preventDefault();
      event.stopPropagation();
      
      // confirm delete
      var theId = this._id // for use by modal
      BootstrapModalPrompt.prompt({
        
        title: "Confirm Article Delete",
        content: "OK to permanently delete this article?",
        btnOkText: "Delete Article", // doesn't work!
        btnDismissText: 'No, Cancel Delete'
          
      }, function(result) {
        if (result) {
          Articles.remove(theId);
        }
        else {
          // nothing - prompt closes
        }
      });
    },
    // nav to Streams Listing
    'click .streams_link': function (event) {
      event.preventDefault(event);
      event.stopPropagation(event);
      Router.go('/streams');
    }
  });
  
   Template.articleCreateTmpl.helpers({ 
   
   //dropdown to associate article with a stream
    streams_select:function() {
       console.log(this._id + " OK then")
       //have this above also - ref
       
       return Streams.find().map(function (strm) {
         return {label: strm.stream_title, value:strm.stream_title};
        });
       
       
      },
    });
    
  Template.articleCreateTmpl.events({ 
    //submit new article
   'submit': function () {
      Router.go('/articles');
      //console.log(this._id)
    },
    // link back to article listing
    'click .articles_link': function(event) {
      event.preventDefault();
        console.log(this._id);
        Router.go('/articles');
    }
  });
  
  Template.articleUpdateTmpl.helpers({ 
   
   //dropdown to associate article with a stream
    streams_select:function() {
       return Streams.find().map(function (strm) {
         return {label: strm.stream_title, value:strm.stream_title};
        });
      },
    });
     
   
 
  Template.articleUpdateTmpl.events({
    //submit updated article 
    'submit': function () {
      Router.go('/articles');
      //console.log(this._id);
    },
    'click .articles_link': function(event) {
      // link back to article listing
        event.preventDefault();
        console.log(this._id);
        Router.go('/articles');
    }
  });
  
}

