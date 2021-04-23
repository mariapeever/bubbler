#!/usr/local/bin/mongo --eval

updated = new Date(updatedAt)
id = new ObjectId(filter)

result = db.privclists.aggregate([
        { $lookup: {
            "from": "privatechats",
            "localField": "active.privateChat",
            "foreignField": "_id",
            "as": "privatechat"
          }
        },
        { $lookup: {
            "from": "privcmsglists",
            "localField": "privatechat.messagesList",
            "foreignField": "_id",
            "as": "messageslist"
          }
        },
        { $lookup: {
            "from": "privcmsglists",
            "localField": "privatechat.messagesList",
            "foreignField": "_id",
            "as": "messageslist"
          }
        },
        {
	        $project: {
	        	_id: 1,
				"messageslist": {
					$filter: {
					   "input": "$messageslist",
					   "as": "item",
					   "cond": { $gt: [ "$$item.updatedAt", updated ] }
					},
				},

	     	},
	    },
        {
          $match: {
            "_id": id
          }
        }])


if (result.hasNext()) {
    printjson(result.next().messageslist);
} else {
    printjson(false);
}




