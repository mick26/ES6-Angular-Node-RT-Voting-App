/* ========================================================== 
WORKING WITH SOCKETS
============================================================ */

// Connect to MongoDB using Mongoose
var mongoose = require('mongoose');

//Mongoose Model
var PollModel = require('./models/mongoosePollModel');


var socket = module.exports = {};


/*
 * Note io object has been passed to the function
 */
socket.sockWorker = function(socket, io) {

	/*================================================================
	$HTTP post /vote
	=================================================================*/
	socket.on('send:vote', function(data) {
		var ip = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address.address;
		

		PollModel.findById(data.poll_id, function(err, poll) {
			var choice = poll.choices.id(data.choice);
			choice.votes.push({ ip: ip });
			
			poll.save(function(err, doc) {
				var theDoc = { 
					question: doc.question, _id: doc._id, choices: doc.choices, 
					userVoted: false, totalVotes: 0 
				};


				// Loop through poll choices to determine if user has voted
				// on this poll, and if so, what they selected
				for(var i = 0, ln = doc.choices.length; i < ln; i++) {
					var choice = doc.choices[i]; 

					for(var j = 0, jLn = choice.votes.length; j < jLn; j++) {
						var vote = choice.votes[j];
						theDoc.totalVotes++;
						theDoc.ip = ip;

						if(vote.ip === ip) {
							theDoc.userVoted = true;
							theDoc.userChoice = { _id: choice._id, text: choice.text };
						}
					}
				}
				
				/*
				 * Update All users
				 */
				socket.emit('myvote', theDoc); //send to user who just voted
				socket.broadcast.emit('vote', theDoc); //sends to all users except user who just voted
			});			
		});
	});

};

