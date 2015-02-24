'use strict';


/*================================================================
- Define a class
- The class will be registered as a controller
=================================================================*/
export default class PollNewCtrl {

	constructor($scope, $location, votingService) {

		/*
		 * Define an empty poll model object
		 */
		$scope.poll = {
			question: '',
			choices: [ { text: '' }, { text: '' }, { text: '' }]
		};
		
		/*
		 * Method to add an additional choice option
		 */
		$scope.addChoice = function() {
			$scope.poll.choices.push({ text: '' });
		};
		
		/*
		 * Validate and save the new poll to the database
		 */
		$scope.createPoll = function() {
			var poll = $scope.poll;
			$scope.error = "";
			
			// Check that a question was provided
			if(poll.question.length > 0) {
				var choiceCount = 0;
				
				// Loop through the choices, make sure at least two provided
				for(var i = 0, ln = poll.choices.length; i < ln; i++) {
					var choice = poll.choices[i];
					
					if(choice.text.length > 0) {
						choiceCount++
					}
				}
			
		
				if(choiceCount > 1) {
		
					/* ========================================================== 
					Create poll - 
					============================================================ */	
					//Request
					votingService.castVote(poll)
					//response Handler
					.then(function(data) {
						$scope.error = "Success! New Poll has been added to database";
					},
					function(error) {
					 	$scope.error = "Error Posting poll " + data;
					});
				} 
				else {
					$scope.error = "You must enter at least two choices";
				}			
			} 

			else {
				$scope.error = "You must enter a question";
			}
		};
	};
};
