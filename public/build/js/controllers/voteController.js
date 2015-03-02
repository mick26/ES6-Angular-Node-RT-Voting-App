define([], function() {
  "use strict";
  'use strict';
  var PollItemCtrl = function PollItemCtrl($scope, $routeParams, $timeout, socket, votingService, dataFormatService) {
    $scope.error = "";
    $scope.poll = [];
    $scope.pieData = [];
    var pieDataRow = {};
    $scope.pieChartLabels = [];
    $scope.pieChartData = [];
    $scope.xFunction = function() {
      return function(d) {
        return d.key;
      };
    };
    $scope.yFunction = function() {
      return function(d) {
        return d.y;
      };
    };
    var colorArray = ['#000000', '#660000', '#CC0000', '#FF6666', '#FF3333', '#FF6666', '#FFE6E6'];
    $scope.colorFunction = function() {
      return function(d, i) {
        return colorArray[i];
      };
    };
    votingService.getVoteData($routeParams.pollId).then(function(voteData) {
      $scope.poll = voteData;
      var promise = dataFormatService.prepDataForPie(voteData);
      promise.then(function(formattedPieData) {
        $scope.pieData = formattedPieData;
      });
    }, function(error) {
      scope.error = "Error getting single poll: " + voteData;
    });
    socket.on('myvote', function(data) {
      if (data._id === $routeParams.pollId) {
        $scope.poll = data;
        var promise = dataFormatService.prepDataForPie(data);
        promise.then(function(formattedPieData) {
          $scope.pieData = formattedPieData;
        });
      }
    });
    socket.on('vote', function(data) {
      if (data._id === $routeParams.pollId) {
        if (data._id === $routeParams.pollId) {
          $scope.poll = data;
          var promise = dataFormatService.prepDataForPie(data);
          promise.then(function(formattedPieData) {
            $scope.pieData = formattedPieData;
          });
        }
      }
    });
    $scope.vote = function() {
      $scope.error = "";
      var pollId = $scope.poll._id;
      var choiceId = $scope.poll.userVote;
      if (choiceId) {
        var voteObj = {
          poll_id: pollId,
          choice: choiceId
        };
        socket.emit('send:vote', voteObj, function(error, data) {
          if (error) {
            $scope.error("Error sending Vote to server");
          }
          if (data) {
            $scope.error("Vote sent to server");
          }
        });
      } else {
        $scope.error = "You must select an option to vote for";
      }
    };
  };
  ($traceurRuntime.createClass)(PollItemCtrl, {}, {});
  var $__default = PollItemCtrl;
  ;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});

//# sourceMappingURL=voteController.map
