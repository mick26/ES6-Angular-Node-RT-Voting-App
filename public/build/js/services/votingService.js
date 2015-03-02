define([], function() {
  "use strict";
  'use strict';
  var votingService = function votingService($http, $q) {
    return {
      getAllVoteData: function() {
        var deferred = $q.defer();
        $http.get('/polls/polls').success(function(votingData, status, headers, config) {
          deferred.resolve(votingData);
        }).error(function(reason) {
          return deferred.reject("OOPS Unable to Get votingData!!!" + reason);
        });
        return deferred.promise;
      },
      getVoteData: function(poll_id) {
        var deferred = $q.defer();
        $http.get('polls/' + poll_id).success(function(voteData, status, headers, config) {
          deferred.resolve(voteData);
        }).error(function(reason) {
          return deferred.reject("OOPS Unable to Get voteData!!!" + reason);
        });
        return deferred.promise;
      },
      castVote: function(vote) {
        var deferred = $q.defer();
        $http.post('/polls', vote).success(function(newVoteData, status, headers, config) {
          deferred.resolve(newVoteData);
        }).error(function(reason) {
          return deferred.reject("OOPS Unable to Get voteData!!!" + reason);
        });
        return deferred.promise;
      }
    };
  };
  ($traceurRuntime.createClass)(votingService, {}, {});
  var $__default = votingService;
  ;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});

//# sourceMappingURL=votingService.map
