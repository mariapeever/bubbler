
var Client = require('ssh2').Client;

// Rename this sample file to main.js to use on your project.
// The main.js file will be overwritten in updates/reinstalls.

var rn_bridge = require('rn-bridge');

// Echo every message received from react-native.

rn_bridge.channel.on('message', (msg) => {

  var conn = new Client();

  conn.on('error', function(err) {
      console.log('SSH :: Connection Error: ' + err);
  });
  conn.on('end', function() {
      console.log('SSH :: Connection Closed');
  });

  conn.on('ready', function() {
      console.log('Client :: ready')
      // ${id} ${updated_at}
      conn.exec(`./exec.js ${msg.id} ${msg.updatedAt}`, function(err, stream) {
        if (err) throw err;
        stream.on('close', function(code, signal) {
          conn.end();
        }).on('data', function(data) {
          console.log('STDOUT: ' + data);
          data = data.toString('utf8')

          rn_bridge.channel.post('message', data);
          
        }).stderr.on('data', function(data) {
          // conn.end();
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
  
});



// Inform react-native node is initialized.
rn_bridge.channel.send("Node was initialized.");


   