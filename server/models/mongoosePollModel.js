/* ========================================================== 
Create Mongoose Schema and Model
Export Schema to make it available in other files 
Export Model to make it available in other files

Ref.
http://mongoosejs.com/docs/guide.html
http://mongoosejs.com/docs/subdocs.html
http://mongoosejs.com/docs/schematypes.html
============================================================ */

/* ========================================================== 
External Modules/Packages Required
============================================================ */
var mongoose = require('mongoose');



/********************************************************************
Mongoose Schema - maps to a MongoDB collection
Defines the documents in the collection. 
http://mongoosejs.com/docs/guide.html
*********************************************************************/

// Subdocument schema for votes
var voteSchema = new mongoose.Schema({ 
	ip: 'String' 
});


// Subdocument schema for poll choices
var choiceSchema = new mongoose.Schema({ 
	text: String,
	votes: [voteSchema]
});




// Document schema for polls
// exports.PollSchema = new mongoose.Schema({
// 	question: { type: String, required: true },
// 	choices: [choiceSchema]
// });


var pollSchema = new mongoose.Schema({
	question: { type: String, required: true },
	choices: [choiceSchema]
});

module.exports = pollSchema; //Export the PollSchema




/********************************************************************
In order to use Schema have to convert it to a Model
Create Mongoose Model - mongoose.model(modelName, schema)
Export Mongoose Model
*********************************************************************/
//UserModel = mongoose.model('User', userSchema);

/* ========================================================== 
CREATE A MONGOOSE MODEL - mongoose.model(modelName, schema)
============================================================ */

var PollModel = mongoose.model('PollModel', pollSchema );

module.exports = PollModel;      //Export the userSchema







