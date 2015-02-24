/* ==========================================================
ROUTES - dealing with the user
ROUTE Definitions


============================================================ */

//Connect to MongoDB using Mongoose
var mongoose = require('mongoose');

//MongoDB Model
var PollModel = require('../models/mongoosePollModel');	//Mongoose Model


/* ========================================================== 
ROUTE Definitions
============================================================ */
module.exports = {


	/*================================================================
	$HTTP get /polls/polls
	Get all the poll Questions from MongoDB
	=================================================================*/
	list : function(req, res) {
		PollModel.find({}, 'question', function(error, polls) {
 			res.json(polls);
		});
	},


	/*================================================================
	$HTTP get /polls/:id
	Get a single poll given it's _id
	=================================================================*/
	poll : function(req, res) {
		//Poll ID comes in the URL
		var pollId = req.params.id;

		/*
		 * Find the poll by its ID in the MongoDB
		 * use lean as we won't be changing it
		 */
		PollModel.findById(pollId, '', { lean: true }, function(err, poll) {
			if(poll) {

				var userVoted = false;
				var userChoice;
				var totalVotes = 0;

				// Loop through poll choices to determine if user has voted
				// on this poll, and if so, what they selected
				for(c in poll.choices) {
					var choice = poll.choices[c]; 

					for(v in choice.votes) {
						var vote = choice.votes[v];
						totalVotes++;

						if(vote.ip === (req.header('x-forwarded-for') || req.ip)) {
							userVoted = true;
							userChoice = { _id: choice._id, text: choice.text };
						}
					}
				}

				// Attach info about user's past voting on this poll
				poll.userVoted = userVoted;
				poll.userChoice = userChoice;
				poll.totalVotes = totalVotes;

				console.dir("POLLS= "+poll); //TEST ----------------------------
			
				res.json(poll);
			} 

			else {
				res.json({error:true});
			}

		});
	},



	/*================================================================
	$HTTP post /polls
	Post a single new poll
	=================================================================*/
	create : function(req, res) {

		var reqBody = req.body;
		//Filter out choices with empty text
		var choices = reqBody.choices.filter(function(v) { return v.text != ''; });
		//Build up poll object to save
		var pollObj = {question: reqBody.question, choices: choices};
					
		//Create poll model from built up poll object
		var poll = new PollModel(pollObj);
		
		/*
		 * Save poll to DB
		 */
		poll.save(function(err, doc) {
			if(err || !doc) {
				throw 'Error';
			} 
			else {
				res.json(doc);
			}		
		});
	}


};	/* @END/ module */ 