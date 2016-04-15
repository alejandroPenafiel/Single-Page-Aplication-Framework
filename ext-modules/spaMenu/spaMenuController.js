(function(){
	'use strict';
	angular.module('spaMenu').controller('spaMenuController', ['$scope', '$rootScope', function($scope, $rootScope){

		$scope.showMenu = true;
		$scope.isVertical = true;
		$scope.openMenuScope = null;
		$scope.allowHorizontalToggle = true;
		
		this.getActiveElement = function (){
			return $scope.activeElement;
		};
		
		this.setActiveElement = function (el){
			$scope.activeElement = el;
		};
		
		this.isVertical = function (){
			return $scope.isVertical;
		};

		this.setRoute = function (route){
			$rootScope.$broadcast('spa-menu-item-selected-event', { route:route}); 
		};

		this.setOpenMenuScope = function (scope){
			$scope.openMenuScope = scope;
		};

		$scope.toggleMenuOrientation = function(){
			if ($scope.openMenuScope)
				$scope.openMenuScope.closeMenu();

			$scope.isVertical = !$scope.isVertical;
			$rootScope.$broadcast('spa-menu-orientation-changed-event', { isMenuVertical: $scope.isVertical });
		};

		$scope.$on('spa-menu-show', function(evt, data){
			$scope.showMenu = data.show;
			$scope.isVertical = data.isVertical;
			$scope.allowHorizontalToggle = data.allowHorizontalToggle;
		});

		angular.element(document).bind('click', function(e){
			if($scope.openMenuScope && !$scope.isVertical) {
				if ($(e.target).parent().hasClass('spa-selectable-item'))
					return;
				$scope.$apply(function(){
					$scope.openMenuScope.closeMenu();
				});
				e.preventDefault();
				e.stopPropagation();
			}
		});
	}]);
})();