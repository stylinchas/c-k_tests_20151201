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