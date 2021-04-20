#!/usr/local/bin/mongo --eval

updated = new Date(updatedAt)

var cond = { _id: new ObjectId(id) }

privatechat = db.privatechats.findOne(cond, { updatedAt: 1 });

if (privatechat.updatedAt.getTime() != updated.getTime()) {
	printjson(db.privatechats.findOne(cond));
} else {
	printjson(false);
}
