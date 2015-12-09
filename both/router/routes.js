Router.configure({
  layoutTemplate: 'ApplicationLayout'
});


// Display All Articles (user scope)
Router.route('/articles', function () {

  this.layout('ApplicationLayout');

  // {{> yield}}
  this.render('ArticlesTmpl');
});

// Display Articles by Stream 
// e.g click on Stream Name in Stream Listing to see related articles
Router.route('/articlesByStream/:catId', function () {
  
  this.layout('ApplicationLayout');
  //console.log(this.params.catId);
  
  // {{> yield}}
  this.render('articlesByStreamTmpl', {
    data: function () {
      // get all articles with matching stream ID
      // create a variable on the template scope - pass it the stream id (in a var called stream_name! to be fixed!) all the matching articles (thestream_name property has the article's stream id
      return {streamArticles:Articles.find({stream_name: String(this.params.catId)})};
    }
    
  });
  
});

// displays the New Article form
Router.route('/articleCreate', function () {
  this.layout('ApplicationLayout');

  // {{> yield}}
  this.render('ArticleCreateTmpl');
});

Router.route('/articleDisplay/:_id', function () {
  this.layout('ApplicationLayout');
  // {{> yield}}
  this.render('ArticleDisplayTmpl', {
    data: function () {
      return Articles.findOne({_id: this.params._id});
    }
  });
});

Router.route('/articleUpdate/:_id', function () {
  this.layout('ApplicationLayout');
  // {{> yield}}
  this.render('ArticleUpdateTmpl', {
    data: function () {
      return Articles.findOne({_id: this.params._id});
    }
  });
});

// displays the listing of streams
Router.route('/streams', function () {

  this.layout('ApplicationLayout');

  // {{> yield}}
  this.render('StreamsListingTmpl');
});

// displays the New Stream form
Router.route('/streamCreate', function () {
  this.layout('ApplicationLayout');

  // {{> yield}}
  this.render('StreamCreateTmpl');
});

Router.route('/streamDisplay/:_id', function () {
  this.layout('ApplicationLayout');
  // {{> yield}}
  this.render('StreamDisplayTmpl', {
    data: function () {
      return Streams.findOne({_id: this.params._id});
    }
  });
});

Router.route('/streamUpdate/:_id', function () {
  this.layout('ApplicationLayout');
  // {{> yield}}
  this.render('StreamUpdateTmpl', {
    data: function () {
      return Streams.findOne({_id: this.params._id});
    }
  });
});