
 var args = process.argv.slice(2);
 var fs = require('fs');
 //console.log('args: ', args);


switch(args[0]) {
   case 'get':
    var config = require('./package.json')
    console.log(config.version)
     break;
   case 'update':
    var config = require('./package.json')
    config.version = args[1]
    fs.writeFileSync('./package.json', JSON.stringify(config,null,2))
     break;
   default:
     console.log('...')

}
