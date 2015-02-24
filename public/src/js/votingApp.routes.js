'use strict';

var moduleName = 'votingApp.routes';

function config($routeProvider) {
	/*================================================
	Define all the Routes
	================================================ */		
	$routeProvider

		.when('/polls', { 
			templateUrl: 'views/list.html', 
			controller: 'votingApp.pollListCtrl' 
		})

		.when('/poll/:pollId', { 
			templateUrl: 'views/item.html', 
			controller: 'votingApp.pollItemCtrl' 
		})

		.when('/new', { 
			templateUrl: 'views/new.html', 
			controller: 'votingApp.pollNewCtrl' 
		})

		// If invalid route, just redirect to the main list view
		.otherwise({ redirectTo: '/polls' });
}


config.$inject = ['$routeProvider'];


/*================================================================
Angular Module - to contain routes
=================================================================*/
angular.module(moduleName, ['ngRoute'])
  .config(config);

export default moduleName;
	