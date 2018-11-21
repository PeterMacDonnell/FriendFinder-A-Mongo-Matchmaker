
// var path = require('path');

// Import the list of friend entries
var friends = require('../data/friends');

// Export API routes
module.exports = function(app) {
	

	// Total list of friend entries
	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	// Add new friend entry
	app.post('/api/friends', function(req, res) {
		// Capture the user input object
		console.log("rq", req.body)
		var userInput = req.body;
		

		var userScores = userInput.scores;
	
			var totalDifference;
		

		// Compute best friend match
		var bestMatch ={
			name: '',
			img: '',
			friendDifference:  Infinity// Make the initial value big for comparison

		};
	

		// Examine all existing friends in the list
		for (var i = 0; i < friends.length; i++) {
			// console.log('friend = ' + JSON.stringify(friends[i]));
			var currentFriend = friends[i];
			console.log(currentFriend.name);
			console.log(currentFriend.img);
			// Compute differences for each question
			totalDifference = 0;
			for (var j = 0; j < currentFriend.scores.length; j++) {
				var currentFriendScore = currentFriend.scores[j];
				var currentUserScore = userScores[j];
				
				totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));

				// diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}
			

			// If lowest difference, record the friend match
			if (totalDifference <= bestMatch.friendDifference) {
				
				bestMatch.name = currentFriend.name;
				bestMatch.img = currentFriend.img;
				bestMatch.friendDifference = totalDifference;
			}
		}

		// Add new user
		friends.push(userInput);

		// Send appropriate response
		// res.json({status: 'OK', matchName: matchName, matchImage: matchImage});

		// send the bestmatch
		res.json(bestMatch);
		console.log(bestMatch);
	});
};