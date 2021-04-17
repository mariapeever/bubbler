#!/usr/local/bin/mongo --eval

updated = new Date(updated_at)

var cond = { _id: new ObjectId(id) }

msglist = db.privcmsglists.findOne(cond, { updated_at: 1 });

if (msglist.updated_at.getTime() != updated.getTime()) {
	printjson(db.privcmsglists.findOne(cond));
} else {
	printjson(false);
}
