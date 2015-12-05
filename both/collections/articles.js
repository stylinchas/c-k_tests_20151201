Articles = new Mongo.Collection('articles');
// articles elements (title, text, etc.) and author-supplied metadata


Articles.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  short_title: {
    type: String,
    label: "Short Title (for Twitter)",
    max: 40
  },
  content: {
    type: String,
    label: "Article Body",
    autoform: {
      afFieldInput: {
        type: 'summernote',
        class: 'editor', // optional
        settings: {
          toolbar: [
            ['font', ['bold', 'italic', 'clear']], //['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol']], //['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture', 'video']], //['insert', ['link', 'picture', 'hr']],
          ],
        }
      }
    }
  },
  stream_names: { // CWS -pick up here - no controllers/helpers
    // a select so user can assign an article to a stream
  // see helper in articles.js
    type:"String",
    label: "Stream"
  },
  creatorID: { 
  // adds the creator's user ID to doc but does not display form field
  // see http://stackoverflow.com/questions/25369368/
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
        type: "hidden",
        label: false
    },
    autoValue: function () { return Meteor.userId() },
  }
}));

/*
Articles.helpers({
	
});

Articles.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});
*/
