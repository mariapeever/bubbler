#! /usr/bin/env node

const { exec } = require("child_process");

var argv = process.argv;

var args = argv.splice(2, 5);

var filter = args[0];
var updatedAt = args[1];
var query = args[2];


exec(`/usr/local/bin/mongo --quiet localhost:27017/bubbler --eval "var filter=\'${filter}\', updatedAt=\'${updatedAt}\'" ./queries/${query}.js`,
	(error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  } 

  console.log(stdout);
})



