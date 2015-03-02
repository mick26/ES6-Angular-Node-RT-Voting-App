define([], function() {
  "use strict";
  'use strict';
  var dataFormatService = function dataFormatService($http, $q) {
    return {prepDataForPie: function(voteData) {
        var pieData = [];
        var pieDataRow = {};
        var deferred = $q.defer();
        for (var i = 0; i < voteData.choices.length; i++) {
          pieDataRow.key = voteData.choices[i].text.toString();
          pieDataRow.y = voteData.choices[i].votes.length;
          pieData.push(pieDataRow);
          pieDataRow = {};
          deferred.resolve(pieData);
        }
        return deferred.promise;
      }};
  };
  ($traceurRuntime.createClass)(dataFormatService, {}, {});
  var $__default = dataFormatService;
  ;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});

//# sourceMappingURL=dataFormatService.map
