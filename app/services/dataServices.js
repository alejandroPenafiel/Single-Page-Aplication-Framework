(function(){
    'use strict';
    angular.module('app').factory('dataService', ['$timeout', function($timeout){
        var locations = [
            {
                id: 1000,
                name: 'River 1',
                temperature: 28,
                guides: 20,
                rafts: 18,
                vests: 200,
                image: 'river1.png'
            },
            {
                id: 1001,
                name: 'River 2',
                temperature: 28,
                guides: 23,
                rafts: 8,
                vests: 204,
                image: 'river1.png'
            },
            {
                id: 1002,
                name: 'River 3',
                temperature: 18,
                guides: 50,
                rafts: 183,
                vests: 500,
                image: 'river1.png'
            },
            {
                id: 1003,
                name: 'River 4',
                temperature: 28,
                guides: 20,
                rafts: 18,
                vests: 200,
                image: 'river1.png'
            },
            {
                id: 1004,
                name: 'River 5',
                temperature: 28,
                guides: 23,
                rafts: 8,
                vests: 204,
                image: 'river1.png'
            },
            {
                id: 1005,
                name: 'River 6',
                temperature: 18,
                guides: 50,
                rafts: 183,
                vests: 500,
                image: 'river1.png'
            }
        ];
        
        var employees = [
            {
                id: 5000,
                location: 'River 1',
                name: 'Andy',
                image: 'employee1.png'
            },
            {
                id: 5001,
                location: 'River 2',
                name: 'April',
                image: 'employee2.png'
            },
            {
                id: 5002,
                location: 'River 4',
                name: 'Morgan',
                image: 'employee3.png'
            }
        ];
        
        var getLocations = function(){
            return $timeout(function(){
                return locations;
            }, 500);
        };
        
        var getLocation = function(id){
            return $timeout(function(){
                for (var i=0; i < locations.length; i++)
                    if (locations[i].id == id)
                        return locations[i];
                return undefined;
            }, 300);
        };
        
        var getEmployees = function(){
            return $timeout(function(){
                return employees;
            }, 500);
        };
        
        var getEmployee = function(id){
            return $timeout(function(){
                for (var i=0; i < employees.length; i++)
                    if (employees[i].id == id)
                        return employees[i];
                return undefined;
            }, 300);
        };
        
        return {
            getLocations: getLocations,
            getLocation: getLocation,
            getEmployees: getEmployees,
            getEmployee: getEmployee
        };
        
    }]);
})();