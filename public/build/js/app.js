define(['./votingApp.routes.js', './services/votingApp.services.js', './controllers/votingApp.controllers.js'], function($__0,$__2,$__4) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  'use strict';
  var routesModuleName = $__0.default;
  var servicesModuleName = $__2.default;
  var controllersModuleName = $__4.default;
  var moduleName = 'votingApp';
  angular.module(moduleName, ['btford.socket-io', 'nvd3ChartDirectives', routesModuleName, servicesModuleName, controllersModuleName]);
  var $__default = moduleName;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});

//# sourceMappingURL=app.map
