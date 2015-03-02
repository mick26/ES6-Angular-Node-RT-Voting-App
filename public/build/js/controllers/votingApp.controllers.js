define(['./listVotesController.js', './newVoteController.js', './voteController.js'], function($__0,$__2,$__4) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  'use strict';
  var PollListCtrl = $__0.default;
  var PollNewCtrl = $__2.default;
  var PollItemCtrl = $__4.default;
  var moduleName = 'votingApp.controllers';
  angular.module(moduleName, []).controller('votingApp.pollListCtrl', PollListCtrl).controller('votingApp.pollNewCtrl', PollNewCtrl).controller('votingApp.pollItemCtrl', PollItemCtrl);
  var $__default = moduleName;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});

//# sourceMappingURL=votingApp.controllers.map
