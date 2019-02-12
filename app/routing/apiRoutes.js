var friends = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        var userResponses = req.body.scores;

        var matchName = '';
        var matchImage = '';
        var totalDifference = 100;

        for (var i = 0; i < friends.length; i++) {
            var difference = 0;
            for (var j = 0; j < userResponses.length; j++) {
                difference += Math.abs(friends[i].scores[j] - userResponses[j]);
            }

            if (difference < totalDifference) {
                totalDifference = difference;
                matchName = friends[i].name;
                matchImage = friends[i].photo;
            }
        }


        friends.push(req.body);
        res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
    });
};