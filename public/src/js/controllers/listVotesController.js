'use strict';

/*================================================================
- Define a class
- The class will be registered as a controller
=================================================================*/
export default class PollListCtrl {

	constructor($scope, votingService) {

		$scope.error = "";

		//Request
		votingService.getAllVoteData()
		//response Handler
		.then(function(votingData) {
			$scope.polls = votingData;		
		},
		function(error, status) {
			$scope.error = "Error getting polls " + data + " " + status;
		});
	}
};

//PollListCtrl.$inject = ['$scope', 'votingService'];