Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

// displays the listing of articles
Router.route('/articles', function () {

  this.layout('ApplicationLayout');

  // {{> yield}}
  this.render('ArticlesTmpl');
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
  this.render('StreamsTmpl');
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