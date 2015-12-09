Streams = new Mongo.Collection('streams');
// articles elements (title, text, etc.) and author-supplied metadata

Streams.attachSchema(new SimpleSchema({
  
  category: { // select drop-down - options in helper
    type: String,
    label:"Category"
    // stores the Category ID
    /*
    ,
    // options for select from helper in controllers/streams.js
     allowedValues: 
       ["RealEstate","Healthcare","Transportation"],
        /*{label: "Real Estate", value: real_estate},
            {label: "Healthcare", value: healthcare},
            {label: "Transportation", value: transportation}*/
      
      /*
       autoform: {
        afFieldInput: {
          firstOption: "(Select a Category)"
        }
      }
      */
  },
  stream_title: { 
  
    type: String,
    label: "Stream Title",
    max: 80
  },
  stream_description: {
    type: String,
    label: "Stream Description",
    max: 250, // ~40 words
    
    autoform: {
      afFieldInput: {
        type: 'summernote',
        class: 'editor', // optional
        settings: {
          toolbar: [
            ['font', ['bold', 'italic', 'clear']], //['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol']], //['para', ['ul', 'ol', 'paragraph']],
          ],
        }
      }
    }
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
