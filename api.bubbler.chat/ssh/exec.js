#! /usr/bin/env node

const { exec } = require("child_process");
var argv = process.argv
var args = argv.splice(2, 4)
var id = args[0]
var updated_at = args[1]

exec(`/usr/local/bin/mongo --quiet localhost:27017/bubbler --eval "var id=\'${id}\', updated_at=\'${updated_at}\'" ./queries/privc_msg_lists.js`, 
	(error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
})
