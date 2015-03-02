define(['./dataFormatService.js', './socketService.js', './votingService.js'], function($__0,$__2,$__4) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  'use strict';
  var moduleName = 'votingApp.services';
  var dataFormatService = $__0.default;
  var socket = $__2.default;
  var votingService = $__4.default;
  angular.module(moduleName, []).factory('dataFormatService', dataFormatService).factory('socket', socket).factory('votingService', votingService);
  var $__default = moduleName;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});

//# sourceMappingURL=votingApp.services.map
