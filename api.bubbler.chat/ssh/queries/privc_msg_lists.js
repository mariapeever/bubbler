#!/usr/local/bin/mongo --eval

updated = new Date(updatedAt)

var cond = { _id: new ObjectId(id) }

msglist = db.privcmsglists.findOne(cond, { updatedAt: 1 });

if (msglist.updatedAt.getTime() != updated.getTime()) {
	var result = db.privcmsglists.findOne(cond)
	var n = result.ok.length
	var limit = 20
	var n_ok = result.ok.length
	var n_flagged = result.flagged.length
	var n_removed = result.removed.length
	result.ok = result.ok.slice(n_ok - Math.min(n_ok, limit), n_ok)
	result.flagged = result.flagged.slice(n_flagged - Math.min(n_flagged, limit), n_flagged)
	result.removed = result.removed.slice(n_removed - Math.min(n_removed, limit), n_removed)

	printjson(result);
}
