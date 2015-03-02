define([], function() {
  "use strict";
  'use strict';
  var PollListCtrl = function PollListCtrl($scope, votingService) {
    $scope.error = "";
    votingService.getAllVoteData().then(function(votingData) {
      $scope.polls = votingData;
    }, function(error, status) {
      $scope.error = "Error getting polls " + data + " " + status;
    });
  };
  ($traceurRuntime.createClass)(PollListCtrl, {}, {});
  var $__default = PollListCtrl;
  ;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});

//# sourceMappingURL=listVotesController.map
