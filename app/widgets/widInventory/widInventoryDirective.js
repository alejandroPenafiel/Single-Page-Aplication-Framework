(function(){
    'use strict';
    angular.module('app').directive('widInventory', ['dataService', function(dataService){
        return {
            templateUrl:'app/widgets/widInventory/widInventoryTemplate.html',
            link: function(scope, el, attrs){
                dataService.getLocation(scope.item.widgetSettings.id).then(function(data){
                    scope.selectedLocation = data;
                });
            }
        };
    }]);
})();