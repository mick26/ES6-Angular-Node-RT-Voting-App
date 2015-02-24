/*================================================
Controller for an individual poll
================================================ */

'use strict';

/*================================================================
- Define a class
- The class will be registered as a controller
=================================================================*/
export default class PollItemCtrl {

	constructor($scope, $routeParams, $timeout, socket, votingService, dataFormatService) {

		$scope.error = "";
		$scope.poll = [];
		$scope.pieData = [];
		var pieDataRow = {};
		$scope.pieChartLabels = [];
		$scope.pieChartData = [];


		/**
		 * The following 3 functions are for nvd3 PieChart
		 */
		//Function that allows nvd3.js and d3.js to access x values from the ‘data’.
		$scope.xFunction = function() {
	    	return function(d) {
	        	return d.key;
	    	};
		}

		//Function that allows nvd3 and d3 to access y values from the ‘data’.
		$scope.yFunction = function() {
			return function(d) {
				return d.y;
			};
		}

		var colorArray = ['#000000', '#660000', '#CC0000', '#FF6666', '#FF3333', '#FF6666', '#FFE6E6'];
		$scope.colorFunction = function() {
			return function(d, i) {
		    	return colorArray[i];
		    };
		}


		//Request
		votingService.getVoteData($routeParams.pollId)
		//response Handler
		.then(function(voteData) {
			$scope.poll = voteData;	
			//Request
			var promise = dataFormatService.prepDataForPie(voteData);		
			//Response
			promise.then(function(formattedPieData) {
				$scope.pieData = formattedPieData;
			})		
		},
		function(error) {
		 	scope.error = "Error getting single poll: " + voteData;
		});



		/*
		 * Sent in response to a user that voted (not broadcast to all) 
		 */
		socket.on('myvote', function(data) {
			if(data._id === $routeParams.pollId) {
				$scope.poll = data;

				//Request
				var promise = dataFormatService.prepDataForPie(data);		
				//Response
				promise.then(function(formattedPieData) {
					$scope.pieData = formattedPieData;
				})	
			}
		});
		

		/*
		 * broadcast from server with updated vote data 
		 * send to all users except last user that voted
		 */
		socket.on('vote', function(data) {
			if(data._id === $routeParams.pollId) {

				if(data._id === $routeParams.pollId) {
					$scope.poll = data;

					//Request
					var promise = dataFormatService.prepDataForPie(data);		
					//Response
					promise.then(function(formattedPieData) {
						$scope.pieData = formattedPieData;
					})	
				}
			}
		});


		/**
		 * Vote function
		 */ 	
		$scope.vote = function() {

			$scope.error = "";
			var pollId = $scope.poll._id;
			var choiceId = $scope.poll.userVote;
			
			if(choiceId) {
				//populate vote Object
				var voteObj = { poll_id: pollId, choice: choiceId };
				//send the vote Object to server
				socket.emit('send:vote', voteObj, function(error, data) {
					if(error) {
						$scope.error("Error sending Vote to server");
					}
					if(data) {
						$scope.error("Vote sent to server");
					}
				});
			} 
			else {
				$scope.error = "You must select an option to vote for";
			}
		};
	};
};
