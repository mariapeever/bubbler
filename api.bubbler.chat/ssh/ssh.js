
var fs = require('fs');
var crypto = require('crypto');
var inspect = require('util').inspect;
const { exec } = require("child_process");
var ssh2 = require('ssh2');
var utils = require('ssh2').utils
 
var allowedPubKey = utils.parseKey(fs.readFileSync('id_rsa.pub'), '')[0];

const server = new ssh2.Server({
  hostKeys: [{ key: fs.readFileSync('id_rsa.pub'), passphrase: '001025_Mp' }],
  banner: 'Connection established'
}, function(client) {
  
  client.on('authentication', function(ctx) {
    // authentication
    console.log('auth');
    ctx.accept();
  })
  client.on('ready', function() {
    console.log('Client authenticated!');
    client.on('session', function(accept, reject) {
      var session = accept();
      
      session.once('exec', function(accept, reject, info) {
        console.log('Client wants to execute: ', inspect(info.command));
        var stream = accept();
      
        exec(info.command, {pty: true},  (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            if (error.code == "EPIPE") {
                console.error('err')
                stream.exit(0);
            }
            stream.stderr.write(`exec error: ${error}`);
            return;
          }

          stream.write(stdout);
          stream.exit(0);
          stream.end();
        });
        
      });
    });
  })
  client.on('end', function() {
    console.log('Client disconnected');
  })
  client.on('error', function(err) {
    console.log('Error',err);
  });
  
}).listen(8002, '192.168.0.65', function() {
  console.log('Listening on port ' + this.address().port);
});

server.on('connection', (client, info) => {
  console.log('Client :: Connection ::', info.ip)
});
