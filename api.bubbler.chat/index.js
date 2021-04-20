var express = require('express');

const app = express();

const port = process.env.PORT || 8000;

var session = require('express-session');
var validator = require('express-validator');
var bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const cors = require("cors");

var config = require('./app/config/app.config');
const db = require("./app/models");

// const fileUpload = require('express-fileupload');

/// added for session management
app.use(session({
  secret: config.SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
     expires: 600000
  }
}));
// use sanitizer
app.use(expressSanitizer());
// use file upload
// app.use(fileUpload());

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

db.mongoose.connect(db.url,  {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Database created!"))
.catch(err => console.log("Cannot connect to the database", err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// new code added to your Express web server
// require('./app/routes/main')(app);
// app.set('views', './views');
// app.set('view engine', 'pug');

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/private-chat.routes')(app);
require('./app/routes/privc-list.routes')(app);
require('./app/routes/privc-message.routes')(app);
require('./app/routes/privc-msg-list.routes')(app);
require('./app/routes/privc-participant.routes')(app);
require('./app/routes/privc-partic-list.routes')(app);

//////////////

app.listen(port, () => console.log(`App listening on port ${port}`));


