var Client = require('ssh2').Client;
// var fs = require('fs');

var conn = new Client();
conn.on('error', function(err) {
    console.log('SSH - Connection Error: ' + err);
});
conn.on('end', function() {
    console.log('SSH - Connection Closed');
});

var state;
conn.on('ready', function() {
    console.log('Client :: ready')
    // ${id} ${updated_at}
    conn.exec(`./exec.js 6070e69572e6e03705db0fcb 2021-04-20T10:54:24.968Z`, function(err, stream) {
      if (err) throw err;
      stream.on('close', function(code, signal) {
        conn.end();
      }).on('data', function(data) {
        console.log('STDOUT: ' + data);
        state = data; 
      }).stderr.on('data', function(data) {
        console.log('STDERR: ' + data);
      });
    });
    
});

conn.connect({
  host: '192.168.0.140',
  port: 8002,
  username: 'root',
  password: 'test'
  // privateKey: { key: fs.readFileSync('id_rsa.pub'), passphrase: '001025_Mp' },
});


