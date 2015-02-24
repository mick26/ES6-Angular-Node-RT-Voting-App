'use strict';

/*================================================================
- Define a class
- The class will be registered as a service
=================================================================*/
export default class votingService {

	constructor($http, $q) {

		return {

	    	getAllVoteData: function () {        

		      	var deferred = $q.defer();
		        $http.get('/polls/polls')

				  .success(function(votingData, status, headers, config) {
		        	deferred.resolve(votingData);
		          })
		          .error(function(reason) {
		            return deferred.reject ("OOPS Unable to Get votingData!!!" + reason);//TEST
		          });

		          return deferred.promise; //returns the promise
	    	},


	      	getVoteData: function (poll_id) {        

		      	var deferred = $q.defer();
				$http.get('polls/'+poll_id)

				  .success(function(voteData, status, headers, config) {
		        	deferred.resolve(voteData);
		          })
		          .error(function(reason) {
		            return deferred.reject ("OOPS Unable to Get voteData!!!" + reason);//TEST
		          });

		          return deferred.promise; //returns the promise
	    	},  

	    	castVote: function(vote) {
	    		var deferred = $q.defer();
				
				$http.post('/polls', vote)

				  .success(function(newVoteData, status, headers, config) {
		        	deferred.resolve(newVoteData);
		          })
		          .error(function(reason) {
		            return deferred.reject ("OOPS Unable to Get voteData!!!" + reason);//TEST
		          });

		          return deferred.promise; //returns the promise
	    	}
		};
	};
};
