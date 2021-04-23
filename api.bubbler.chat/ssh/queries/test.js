#!/usr/local/bin/mongo --eval

var ids = filter.split(',').map(e => new ObjectId(e)) 

var cond = { _id: { $in: ids }}

msglist = db.privcmsglists.find(cond, { updatedAt: 1 }).forEach((e, i) => {
	printjson(e)
	if (e.updatedAt.getTime() != updatedAt[i].getTime()) {
		var result = db.privcmsglists.findOne(cond)
		var n = result.ok.length
		var limit = 10
		var n_ok = result.ok.length
		var n_flagged = result.flagged.length
		var n_removed = result.removed.length
		result.ok = result.ok.slice(n_ok - Math.min(n_ok, limit), n_ok)
		result.flagged = result.flagged.slice(n_flagged - Math.min(n_flagged, limit), n_flagged)
		result.removed = result.removed.slice(n_removed - Math.min(n_removed, limit), n_removed)

		printjson(result)
	} else {
		printjson(result)
	}
})
