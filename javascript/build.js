var buildify = require('buildify');

buildify()
  .concat(['jquery.autosize.js','marked.js','StaticVariables.js', 'models.js','helpers.js','drafts.js']).wrap('base.js').save('./index.js')
.uglify().save('./index.min.js');
  

