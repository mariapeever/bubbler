Instructions

1. Increase the open files limit on your system 

On Mac OS `launchctl limit maxfiles`
On other platforms follow instructions on https://docs.riak.com/riak/kv/latest/using/performance/open-files-limit/index.html#debian-ubuntu

2. Import demo data to MongoDB

`mongorestore -d bubbler /data/bubbler`

3. Start the node/express API:

`cd api.bubbler.chat`
`node index.js` or `forever start index.js`

4. Start the SSH-2 server
`cd api.bubbler.chat/ssh`
`node ssh.js` or `forever start ssh.js`

5. Run the Bubbler client on an iOS simulator
`cd Bubbler`
`npx react-native run-ios`

6. Login using a demo account (below) or create an account

* There is a bug in creating a new chat. In case of issues, refresh the screen and login again.


Demo accounts

username: Testuser1
password: =]-[0p9O

username: Testuser2
password: =]-[0p9O

username: Testuser3
password: =]-[0p9O

username: Testuser4
password: =]-[0p9O

username: Testuser5
password: =]-[0p9O

username: Testuser6
password: =]-[0p9O

username: Testuser7
password: =]-[0p9O

username: Testuser8
password: =]-[0p9O

username: Testuser9
password: =]-[0p9O

username: Testuser10
password: =]-[0p9O

username: Testuser11
password: =]-[0p9O

username: Testuser12
password: =]-[0p9O

username: Testuser13
password: =]-[0p9O

username: Testuser14
password: =]-[0p9O