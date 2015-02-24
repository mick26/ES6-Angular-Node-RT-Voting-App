'use strict';

/*================================================================
- Define a class
- The class will be registered as a controller
=================================================================*/
export default class dataFormatService {
	constructor($http, $q) {

		return {

	    	prepDataForPie: function (voteData) {        
	    		var pieData = [];
	    		var pieDataRow = {};
		      	var deferred = $q.defer();

				for(var i=0; i < voteData.choices.length; i++) {
					pieDataRow.key = voteData.choices[i].text.toString();
					pieDataRow.y = voteData.choices[i].votes.length;
					pieData.push(pieDataRow);
					pieDataRow = {};
					deferred.resolve(pieData);
				}
		        return deferred.promise; //returns the promise
	    	}
		}
	};
};