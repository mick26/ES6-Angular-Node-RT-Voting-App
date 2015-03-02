define([], function() {
  "use strict";
  'use strict';
  var PollNewCtrl = function PollNewCtrl($scope, $location, votingService) {
    $scope.poll = {
      question: '',
      choices: [{text: ''}, {text: ''}, {text: ''}]
    };
    $scope.addChoice = function() {
      $scope.poll.choices.push({text: ''});
    };
    $scope.createPoll = function() {
      var poll = $scope.poll;
      $scope.error = "";
      if (poll.question.length > 0) {
        var choiceCount = 0;
        for (var i = 0,
            ln = poll.choices.length; i < ln; i++) {
          var choice = poll.choices[i];
          if (choice.text.length > 0) {
            choiceCount++;
          }
        }
        if (choiceCount > 1) {
          votingService.castVote(poll).then(function(data) {
            $scope.error = "Success! New Poll has been added to database";
          }, function(error) {
            $scope.error = "Error Posting poll " + data;
          });
        } else {
          $scope.error = "You must enter at least two choices";
        }
      } else {
        $scope.error = "You must enter a question";
      }
    };
  };
  ($traceurRuntime.createClass)(PollNewCtrl, {}, {});
  var $__default = PollNewCtrl;
  ;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});

//# sourceMappingURL=newVoteController.map
