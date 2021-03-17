const dbConfig = require("../config/db.config");

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.auths = require("./auth.model")(mongoose)
// db.authzs = require("./authz.model")(mongoose)
// db.documents = require("./document.model")(mongoose)
// db.images = require("./image.model")(mongoose)
// db.calls = require("./call.model")(mongoose)
// db.callsLists = require("./calls-list.model")(mongoose)
// db.connections = require("./connection.model")(mongoose)
// db.links = require("./link.model")(mongoose)
// db.liveCParticipants = require("./livec-participant.model")(mongoose)
// db.liveCParticipantsLists = require("./livec-participants-list.model")(mongoose)
// db.liveChats = require("./live-chat.model")(mongoose)
// db.liveCLists = require("./livec-list.model")(mongoose)
db.privCMessages = require("./privc-message.model")(mongoose)
db.privCMessagesLists = require("./privc-messages-list.model")(mongoose)
// db.privCReplies = require("./privc-reply.model")(mongoose)
// db.privCThreads = require("./privc-thread.model")(mongoose)
db.privCParticipants = require("./privc-participant.model")(mongoose)
db.privCParticipantsLists = require("./privc-participants-list.model")(mongoose)
db.privateChats = require("./private-chat.model")(mongoose)
db.privCLists= require("./privc-list.model")(mongoose)
db.roles = require("./role.model")(mongoose)
// db.videos = require("./video.model")(mongoose)
// db.voiceRecs = require("./voice-rec.model")(mongoose)
db.users = require("./user.model")(mongoose)

module.exports = db;