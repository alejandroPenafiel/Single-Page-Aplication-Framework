(function(){
    'use strict';
    angular.module('app').directive('widEmployee', ['dataService', function(dataService){
        return {
            templateUrl:'app/widgets/widEmployee/widEmployeeTemplate.html',
            link: function(scope, el, attrs){
                dataService.getEmployee(scope.item.widgetSettings.id).then(function(data){
                    scope.selectedEmployee = data;
                });
            }
        };
    }]);
})();