'use strict';

/*Your first task is to build a command-line application that displays its usage, ideally to the standard error channel, when invoked without a subcommand.*/
//The app should exit the process with a non-zero exit code to indicate that it failed to complete any work.*/
/*

$ node pets.js
Usage: node pets.js [read | create | update | destroy]
Your next task is to refactor the application to handle the read subcommand via the process arguments, read the pets.json file, parse its data to a native JavaScript object, and log it to the console. If the call to the filesystem fails for any reason, it should throw the resulting error.*/


var fs = require('fs');
var path = require('path');
var petPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];


if (cmd === 'read') {
  fs.readFile(petPath, 'utf8', function(err, data){
    var index= process.argv[3];
    var pets = JSON.parse(data);
    if (err) {
      throw err;
    }
else if (index === undefined){
  console.log(pets);
  process.exit(1);


}
if (index > pets.length || index < 0 ){
  console.error(`Usage: ${node} ${file} read INDEX`);
  process.exit(1);
}

console.log(pets[index]);

  });

}

else if (cmd === 'create') {
  fs.readFile(petPath, 'utf8', function(readErr, data){
    var age = process.argv[3];
    var kind = process.argv[4];
    var name = process.argv[5];



    if (readErr) {
      throw readErr;
    }
  var pets = JSON.parse(data);

  if (age === undefined || kind === undefined || name === undefined){
    console.error(`Usage: ${node} ${file} create AGE KIND NAME`);

  }
  else {
    var createPet = {age: age, kind: kind, name: name };


    pets.push(createPet);
var petsJSON = JSON.stringify(pets);

fs.writeFile(petPath, petsJSON, function(writeErr){
  if (writeErr)  {
    throw writeErr;
  }
  console.log(createPet);
});


}

}
);
}

/*$ node pets.js read
[ { age: 7, kind: 'rainbow', name: 'fido' },
  { age: 5, kind: 'snake', name: 'Buttons' } ]
Additionally, your application must handle the read subcommand when given an index. In this case, it must read the pets.json file, parse its data to a native JavaScript object, access the correct record, and log it to the console. If the call to the filesystem fails for any reason, it should throw the resulting error.

$ node pets.js read 0
{ age: 7, kind: 'rainbow', name: 'fido' }

$ node pets.js read 1
{ age: 5, kind: 'snake', name: 'Buttons' }
Additionally, your application must handle the read subcommand when given an out-of-bound index. In this case, it must display a more specific usage to the standard error channel and exit with a non-zero exit code.

$ node pets.js read 2
Usage: node pets.js read INDEX

$ node pets.js read -1
Usage: node pets.js read INDEX
Finally, your application must also handle the create subcommand. Only when given an age, kind, and name will it create a record in the database. Remember to convert the age into an integer. For example:

$ node pets.js create
Usage: node pets.js create AGE KIND NAME

$ node pets.js create 3
Usage: node pets.js create AGE KIND NAME

$ node pets.js create 3 parakeet
Usage: node pets.js create AGE KIND NAME

$ node pets.js create 3 parakeet Cornflake
{ age: 3, kind: 'parakeet', name: 'Cornflake' }

$ node pets.js read 2
{ age: 3, kind: 'parakeet', name: 'Cornflake' }
If the pets.json file ever becomes corrupted, you can reset it with the git checkout command.

$ git checkout -- pets.json
We have provided tests for you to check your work. To run the command for this exercise, run the following command.

$ npm test test/pets.test.js
Bonus

Refactor your app to also update records in the database when given the update subcommand. Remember to convert the age into an integer. For example:

$ node pets.js update
Usage: node pets.js update INDEX AGE KIND NAME

$ node pets.js update 1
Usage: node pets.js update INDEX AGE KIND NAME

$ node pets.js update 1 9
Usage: node pets.js update INDEX AGE KIND NAME

$ node pets.js update 1 9 cat
Usage: node pets.js update INDEX AGE KIND NAME

$ node pets.js update 1 9 cat Rosey
{ age: 9, kind: 'cat', name: 'Rosey' }

$ node pets.js read 1
{ age: 9, kind: 'cat', name: 'Rosey' }
Bonus

Refactor your app to also destroy records in the database when given the destroy subcommand. For example:

$ node pets.js destroy
Usage: node pets.js destroy INDEX

$ node pets.js destroy 1
{ age: 5, kind: 'snake', name: 'Buttons' }

$ node pets.js read
[ { age: 7, kind: 'rainbow', name: 'fido' } ]
Bonus

Convert the code in your pets.js file into ES6 syntax. It may be helpful to use linting rules to assist in the conversion.

eslint-config-airbnb
eslint-config-ryansobol
Bonus

Add a shebang(#!) to the start of the pets.js file and modify its permissions so it can be run from the command-line without the node command. For example:

$ ./pets.js read
[ { age: 7, kind: 'rainbow', name: 'fido' },
  { age: 5, kind: 'snake', name: 'Buttons' } ]

$ ./pets.js read 0
{ age: 7, kind: 'rainbow', name: 'fido' }

$ ./pets.js create 3 parakeet Cornflake
{ age: 3, kind: 'parakeet', name: 'Cornflake' }

$ ./pets.js read
[ { age: 7, kind: 'rainbow', name: 'fido' },
  { age: 5, kind: 'snake', name: 'Buttons' },
  { age: 3, kind: 'parakeet', name: 'Cornflake' } ]
Bonus Tests

We have provided tests for you to check your work for the bonus specifically. To run the command for this exercise, run the following command.

$ npm test test/pets.bonus.test.js*/
