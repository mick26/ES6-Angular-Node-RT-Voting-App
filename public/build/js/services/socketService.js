define([], function() {
  "use strict";
  'use strict';
  var socket = function socket(socketFactory) {
    return socketFactory();
  };
  ($traceurRuntime.createClass)(socket, {}, {});
  var $__default = socket;
  ;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});

//# sourceMappingURL=socketService.map
