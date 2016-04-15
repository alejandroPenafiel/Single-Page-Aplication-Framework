(function(){
    'use strict';
    angular.module('spaDashboard').directive(
        'spaDashboard', function(){
        return {
            templateUrl: 'ext-modules/spaDashboard/spaDashboardTemplate.html',
            link: function (scope, element, attrs){
                scope.addNewWidget = function (widget) {
                    var newWidget = angular.copy(widget.settings);
                    scope.widgets.push(newWidget);
                } 
            }
        };
    });
})();