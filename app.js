var MOCK_STATUS_UPDATES = {
	"statusUpdates": [
		{
			"id": "1111111",
			"text": "Can't believe how much fun I'm having.",
			"friendId": "aaaaaa",
			"friendName": "John Doe",
			"publishedAt": 1470016976609
		},
		{
			"id": "2222222",
			"text": "Have FOMO? Well you SHOULD!",
			"friendId": "bbbbbbb",
			"friendName": "Jane Doe",
			"publishedAt": 1470012976609
		},
		{
			"id": "333333",
			"text": "They're giving out immortality and free $$$ where I am.",
			"friendId": "cccc",
			"friendName": "Jim Doe",
			"publishedAt": 1470011976609
		},
		{
			"id": "4444444",
			"text": "humble brag humble brag humble brag",
			"friendId": "ddddd",
			"friendName": "Jackie Doe",
			"publishedAt": 1470009976609
		}
	]
};

function getRecentStatusUpdates(callbackFn) {
	setTimeout(function(){ callbackFn(MOCK_STATUS_UPDATES)}, 100);
}

// this function stays the same when we connect
// to real API later
function displayStatusUpdates(data) {
	for (index in data.statusUpdates) {
		$('body').append(
			'<p>' + data.statusUpdates[index].text + '</p>');
	}
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayStatusUpdates() {
	getRecentStatusUpdates(displayStatusUpdates);
}

$(function() {
	getAndDisplayStatusUpdates();
})