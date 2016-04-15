(function(){
    'use strict';
    angular.module('app').directive('widTemperature', ['dataService', function(dataService){
        return {
            templateUrl:'app/widgets/widTemperature/widTemperatureTemplate.html',
            link: function(scope, el, attrs){
                dataService.getLocation(scope.item.widgetSettings.id).then(function(data){
                    scope.selectedLocation = data;
                });
            }
        };
    }]);
})();