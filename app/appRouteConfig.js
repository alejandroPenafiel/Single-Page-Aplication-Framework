(function(){
    'use strict';
    angular.module('app').config(['$routeProvider', function($routeProvider){
        var routes = [
            {
                url: '/dashboard',
                config:{
                    template: '<wid-dashboard></wid-dashboard>'
                }
            },
            {
                url: '/location',
                config:{
                    template: '<wid-locations></wid-locations>'
                }
            },
            {
                url: '/guides',
                config:{
                    template: '<wid-guides></wid-guides>'
                }
            }
        ];
        
        routes.forEach(function(route){
            $routeProvider.when(route.url, route.config);
        });
        
        $routeProvider.otherwise({
            redirectTo: '/dashboard'
        });
    }]);
})();