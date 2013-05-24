var buildify = require('buildify');

buildify()
  .concat(['StaticVariables.js', 'models.js','helpers.js','drafts.js'])
  .save('./index.js')

