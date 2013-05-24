var buildify = require('buildify');

buildify()
  .concat(['StaticVariables.js', 'models.js','helpers.js'])
  .save('./index.js')

