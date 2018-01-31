var friends = require("../data/friends");

module.exports = function(app) {

	app.get("/api/friends", function(req,res) {
		res.json(friends);
	});

	// Logs new users - takes in JSON input
	app.post("/api/friends",(req,res)=>{
		console.log("Post request received");
		console.log("Scores: " + req.body["scores[]"]);

		var newUser = {
			name: req.body.name,
			photo: req.body.photo,
			scores: req.body["scores[]"]
		};
		
		console.log("Name: " + newUser.name + "\nPhoto link: " + newUser.photo + "\nScore: " + newUser.scores)

		var comparison = [];

		for (var i = 0; i < friends.length; i++) {
			console.log("Comparing to: " + friends[i].name);
			var compatibility = 0

			for (var j = 0; j < friends[i].scores.length; j++) {
			
				compatibility += Math.abs(friends[i].scores[j] - newUser.scores[j]);
			}

			console.log(friends[i].name + " has " + compatibility + " degrees of difference from " + newUser.name + "!");
			if (i === 0) {
				comparison.push(friends[i]);
				comparison.push(compatibility);
			} else {
				if (comparison[1] > compatibility) {
					comparison.unshift(friends[i], compatibility)
				}
			}

		}
		console.log("Most Compatibile with: " + comparison[0].name);
		friends.push(newUser);
		res.json(comparison[0]);
	});

};
