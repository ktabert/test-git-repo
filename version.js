
 var args = process.argv.slice(2);
 var fs = require('fs');
 //console.log('args: ', args);

function updateVersion(to, synopsis) {
  const { execSync } = require('child_process');

//  let stdout = execSync('ls');
  //console.log(stdout.toString())
    /*stdout.on('data', function(data) {
    console.log(data.toString());
});*/

  function validate(exeRes) {
    console.log(exeRes.toString());
  }

  validate(execSync('git checkout develop'))
  validate(execSync('git pull'))
  var config = require('./src/package.json')
  let lastVersion = config.version
  let newVersion = to

  if (lastVersion === newVersion)
    throw "Version doesn't change."


  config.version = newVersion


  fs.writeFileSync('./src/package.json', JSON.stringify(config,null,2))

  validate(execSync('git add ./src/package.json'))
  validate(execSync(`git commit -m "updated version definition to ${newVersion}`+(synopsis?` for \\"${synopsis}\\""`:'')))
  validate(execSync(`git tag -a ${newVersion} -m "`+(synopsis||'')+'"'))
  validate(execSync('git push'))
  validate(execSync(`git push origin ${newVersion}`))

}



switch(args[0]) {
   case 'get':
    var config = require('./src/package.json')
    console.log(config.version)
     break;
   case 'update':
    updateVersion(args[1],args[2])
     break;
   default:
     console.log('...')

}
