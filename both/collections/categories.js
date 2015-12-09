Categories = new Mongo.Collection('categories');
// articles elements (title, text, etc.) and author-supplied metadata

/// added these as individual catageory docs from console
/*Categories.remove( [
      {name: "Real Estate"},
      {name: "Healthcare"},
      {name: "Finances"}
      ]
);
*/
//Categories.insert( {name: "Real Estate"} );