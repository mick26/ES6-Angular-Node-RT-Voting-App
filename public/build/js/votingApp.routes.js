define([], function() {
  "use strict";
  'use strict';
  var moduleName = 'votingApp.routes';
  function config($routeProvider) {
    $routeProvider.when('/polls', {
      templateUrl: 'views/list.html',
      controller: 'votingApp.pollListCtrl'
    }).when('/poll/:pollId', {
      templateUrl: 'views/item.html',
      controller: 'votingApp.pollItemCtrl'
    }).when('/new', {
      templateUrl: 'views/new.html',
      controller: 'votingApp.pollNewCtrl'
    }).otherwise({redirectTo: '/polls'});
  }
  config.$inject = ['$routeProvider'];
  angular.module(moduleName, ['ngRoute']).config(config);
  var $__default = moduleName;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});

//# sourceMappingURL=votingApp.routes.map
