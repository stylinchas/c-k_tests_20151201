Articles = new Mongo.Collection('articles');

// articles elements (title, text, etc.) and author-supplied metadata

Articles.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Article Title",
    max: 200
  },
  short_title: {
    type: String,
    label: "Short Article Title (for Twitter)",
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
  stream_name: { 
    // a select so user can assign an article to a stream
  // see helper in articles.js
    type: String,
    label: "Article Stream"
  },
  streamID: {
    // a select so user can assign an article to a stream
  // see helper in articles.js
    type: String,
    label: "Stream ID",
    autoform: {
        type: "hidden",
        label: false
    },
    autoValue : function() {return  'in stream_name - cws to fix' },
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
  },
  createDate: { 
    type: String,
    autoform: {
        type: "hidden",
        label: false
    },
    autoValue: function () { return  Date() },
  }
  
}));

/*
Articles.helpers({
	
});

Articles.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});
*/
