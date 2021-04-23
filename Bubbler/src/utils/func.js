

export const dateToTimeDateLabel = date => {
	var date = new Date(date)
	var now = Date.now()
	var min = Math.abs(Math.floor((((date - now) / 1000) / 60)))
	var hrs = Math.abs(Math.floor(min / 60))
	if (min < 60) return `${min} min ago`
	if (hrs < 24) return `${hrs} hrs ago`

	return date.toLocaleDateString()
}

export const extractId = payload => {
	let id = Object.keys(payload)[0]
	return id ? id : false
}