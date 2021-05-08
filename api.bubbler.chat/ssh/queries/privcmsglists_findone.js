#!/usr/local/bin/mongo --eval

updated = new Date(updatedAt)

var cond = { _id: new ObjectId(filter) }

msglist = db.privcmsglists.findOne(cond, { updatedAt: 1 });

if (msglist.updatedAt.getTime() > updated.getTime()) {
	var result = db.privcmsglists.findOne(cond)
	var n = result.ok.length
	var limit = 20
	var n_ok = result.ok.length
	var n_flagged = result.flagged.length
	var n_removed = result.removed.length
	result.ok = result.ok.slice(Math.max(n_ok - limit, 0), n_ok)
	result.flagged = result.flagged.slice(Math.max(n_flagged - limit, 0), n_flagged)
	result.removed = result.removed.slice(Math.max(n_removed - limit, 0), n_removed)

	printjson(result);
} else {
	printjson(false);
}


