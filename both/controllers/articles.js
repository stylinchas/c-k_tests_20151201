// JavaScript Document
if (Meteor.isClient) {
  
  // get the data for the Articles templates
  
  Meteor.subscribe("articles"); 
  Meteor.subscribe("streams");
  Meteor.subscribe("categories");
  /*
  
  
  // Hooks - could not get this to work - wanted to add category and stream names to child records as well as ID's from selects, but had to do clugy template varables helpers instead
  // hooks run after form submit and add the Stream name to the article
  var hooksObj = {
    insertArticleForm: {
      formToDoc: function(doc) {
        doc.short_title = 'UPDATED';
        return doc;
      }
    }
    
  }
  
  AutoForm.addHooks(['insertArticleForm'], hooksObj);
  */
  
  // The Articles Listing template
  Template.articlesTmpl.helpers({
    
    // get user's articles
    articles: function() {
      
      // get user ID to compare with article creator ID 
      var thisUserID = Meteor.userId();
      
      //  only display articles by this user
      //  i.e. where article creator ID matches the user ID
      var theArticles = Articles.find().fetch(); // {creatorID:thisUserID}
      return theArticles;
    },
    userID: function() {
      return Meteor.userId();
    },
    
    // get the category for each stream 
    
    stream_name: function() {
        // did this b/c I cound not get hooks to return what I needed
       // first, get the current stream ID
      var theId = this.stream_name // the current stream id stored on the article doc
      console.log('the ID is '+theId);
      
      var thisStreamDoc = Streams.find( {_id:theId} ).fetch();
      
      //console.log('doc '+thisStreamDoc[0]['stream_title']);
      var streamTitle = (thisStreamDoc[0]['stream_title']);
      
      return streamTitle // the current stream title
    }
  }); 
  
  
  // the Article Listing events
  Template.articlesTmpl.events({ 
  
  ///CRUD article links
  
    // New Article button
     'click .add_article button': function() {
        Router.go('/articleCreate');
    },
    // display full article link - title of article
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
    // Delete article link - needs warnings
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
  
  // note: the filtered article data is set on the route
  Template.articlesByStreamTmpl.helpers({ 
  
    // for the bread crumbs
    articlesCategoryName: function() {
      var catName = Session.get('currentCategoryName');
      return catName;
    },
    articlesStreamName: function() {
      var streamName = Session.get('currentStreamName');
      return streamName;
    }
  });
  // the Article Listing events
  Template.articlesByStreamTmpl.events({ 
  
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
        return Streams.find().map(function (strm) {
          return {label: strm.stream_title, value:String(strm._id)};
        });
      }
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
       return {label: strm.stream_title, value:String(strm._id) };  //String(stream_title)
      });
    }
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

