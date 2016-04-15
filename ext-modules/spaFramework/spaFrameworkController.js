(function(){
	'use strict';
	angular.module('spaFramework').controller('spaFrameworkController', ['$scope', '$rootScope', '$window', '$timeout', '$location', function($scope, $rootScope, $window, $timeout, $location){

		$scope.isMenuVisible = true;
		$scope.isMenuButtonVisible = true;
		$scope.isMenuVertical = true;

		$scope.$on('spa-menu-item-selected-event', function(evt, data){
			$scope.routeString = data.route;
            $location.path(data.route);
			checkWidth();
			broadcastMenuState();
		});

		$scope.$on('spa-menu-orientation-changed-event', function(evt, data){
			$scope.isMenuVertical = data.isMenuVertical;
		});

		$($window).on('resize.spaFramework', function(){
			$scope.$apply(function(){
				checkWidth();
				broadcastMenuState();
			});
		});

		$scope.$on('$destroy', function(){
			$(window).off('resize.spaFramework');
		});

		var checkWidth = function(){
			var width = Math.max($($window).width(), $window.innerWidth);
			$scope.isMenuVisible = (width > 768);
			$scope.isMenuButtonVisible = !$scope.isMenuVisible;
		};

		$scope.menuButtonClicked = function(){
			$scope.isMenuVisible = !$scope.isMenuVisible;
			broadcastMenuState();
			$scope.$apply();
		};

		var broadcastMenuState = function(){
			$rootScope.$broadcast('spa-menu-show', {
				show: $scope.isMenuVisible,
				isVertical: $scope.isMenuVertical,
				allowHorizontalToggle: !$scope.isMenuButtonVisible
			});
		};

		$timeout(function() {
			checkWidth();
		}, 0);
		
	}]);
})();