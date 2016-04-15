(function(){
    'use strict';
    angular.module('app').directive('widDashboard', ['$localStorage', function($localStorage){
        return {
            scope:{},
            template:'<spa-dashboard></spa-dashboard>',
            link: function(scope) {
                
                scope.dash = 'Dashboard';

                scope.gridsterOpts = {
                    columns: 12,
                    margins: [20, 20],
                    outerMargin: false,
                    pushing: true,
                    floating: true,
                    swapping: false,
                };
                
                scope.widgetDefinitions = [
                    {
                        title: 'Temperature',
                        settings: {
                            sizeX:3,
                            sizeY:3,
                            template: '<wid-temperature></wid-temperature>',
                            widgetSettings: {
                                id: 1000,
                                templateUrl: 'app/dialogs/widSelectLocationTemplate.html',
                                controller: 'widSelectLocationController'
                            }
                        }
                    },
                    {
                        title: 'Inventory',
                        settings: {
                            sizeX:3,
                            sizeY:3,
                            template: '<wid-inventory></wid-inventory>',
                            widgetSettings: {
                                id: 1004,
                                templateUrl: 'app/dialogs/widSelectLocationTemplate.html',
                                controller: 'widSelectLocationController'
                            }
                        }
                    },
                    {
                        title: 'Employee',
                        settings: {
                            sizeX:3,
                            sizeY:3,
                            template: '<wid-employee></wid-employee>',
                            widgetSettings: {
                                id: 5000,
                                templateUrl: 'app/dialogs/widSelectEmployeeTemplate.html',
                                controller: 'widSelectEmployeeController'
                            }
                        }
                    }
                ];   
                scope.widgets = $localStorage.widgets || [];
                
                scope.$watch('widgets', function(){
                    $localStorage.widgets= scope.widgets;
                }, true);
            }
        };
    }]);
})();