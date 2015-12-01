// JavaScript Document
if (Meteor.isClient) {
  
  // get the data for the Articles templates
  
  Meteor.subscribe("articles");
  
  Template.articlesTmpl.helpers({
  
    articles: function() {
      var theArticles = Articles.find({}).fetch();
      console.log(theArticles)
      return theArticles;
    }
  });
  
  // the Article Listing events
  Template.articlesTmpl.events({ 
  
  ///CRUD article links
  
    // New Article buton
     'click .add_article button': function() {
        Router.go('/articleCreate');
    },
    // Display article in full
    'click li span.title': function (event) {
      event.preventDefault(event);
      Router.go('/articleDisplay/'+this._id);
    },
    // Update article in form
    'click a.update_article': function (event) {
      event.preventDefault(event);
      event.stopPropagation(event);
      Router.go('/articleUpdate/'+this._id);
    },
    // Delete article - needs warnings
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
          
        }
      });
    }
  });
  
  Template.articleCreateTmpl.events({ 
    //submit new article
   'submit': function () {
      Router.go('/articles');
      //console.log(this._id);
    },
    // link back to article listing
    'click .articles_link': function(event) {
      event.preventDefault();
        console.log(this._id);
        Router.go('/articles');
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

