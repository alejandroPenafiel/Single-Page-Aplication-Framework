(function(){

	angular.module('spaMenu', ['ngAnimate']);
})(); 
(function(){

	angular.module('spaMenu').directive('spaMenuItem', function(){
		return {
			require:'^spaMenu',
			scope:{
				label: '@',
				icon:'@',
				route:'@'
			},
			templateUrl:'ext-modules/spaMenu/spaMenuItemTemplate.html',
			link: function(scope, el, attr, ctrl){
				
				scope.isActive = function(){
					return el === ctrl.getActiveElement();
				};

				scope.isVertical = function(){
					return ctrl.isVertical() || el.parents('.spa-subitem-section').length > 0;
				};

				el.on('click', function(evt){
					evt.stopPropagation();
					evt.preventDefault();
					scope.$apply(function(){
						ctrl.setActiveElement(el);
						ctrl.setRoute(scope.route);
					});
				});
			}
		};
	});
})();
(function(){

	angular.module('spaMenu').directive('spaMenuGroup', function(){
		return {
			require:'^spaMenu',
			transclude:true,
			scope: {
				label:'@',
				icon:'@'
			},
			templateUrl:'ext-modules/spaMenu/spaMenuGroupTemplate.html',
			link: function(scope, el, attrs, ctrl){
				
				scope.isOpen = false;
				scope.closeMenu = function(){
					scope.isOpen = false;
				};
				
				scope.isVertical = function(){
					return ctrl.isVertical() || el.parents('.spa-subitem-section').length > 0;
				};

				scope.closeMenu = function(){
					scope.isOpen = false;
				};
				
				scope.clicked = function(){
					scope.isOpen = !scope.isOpen;
					if (el.parents('.spa-subitem-section').length === 0)
						scope.setSubmenuPosition();
					ctrl.setOpenMenuScope(scope);
				};

				scope.setSubmenuPosition = function (){
					var pos = el.offset();
					$('.spa-subitem-section').css({'left': pos.left + 20, 'top': 36});
				};
			}
		};
	});
})(); 
(function(){

	angular.module('spaMenu').directive('spaMenu', ['$timeout', function($timeout) {
		return {
			scope:{},
			transclude:true,
			templateUrl:'ext-modules/spaMenu/spaMenuTemplate.html',
			controller:'spaMenuController',
			link: function(scope, el, attr){
				var item = el.find('.spa-selectable-item:first');
				$timeout(function(){
					item.trigger('click');
				});
			}
		};
	}]);
})();
(function(){

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
(function(){

	angular.module('spaFramework', [
		'spaMenu',
		'spaDashboard'
		]);
})();
(function(){

	angular.module('spaFramework').directive('spaFramework', function(){
		return {
			transclude:true,
			scope:{
				title:'@',
				subtitle:'@',
				iconFile: '@'
			},
			controller:'spaFrameworkController',
			templateUrl:'ext-modules/spaFramework/spaFrameworkTemplate.html'
		};
	});
})();
(function(){

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
(function(){

    angular.module('spaDashboard', ['gridster', 'ui.bootstrap']);
})(); 
(function(){

    angular.module('spaDashboard').directive(
        'spaWidgetBody', ['$compile', '$uibModal', function($compile, $uibModal){
            return {
                templateUrl:'ext-modules/spaDashboard/spaWidgetBodyTemplate.html',
                link: function(scope, element, attrs){
                    var newElement = angular.element(scope.item.template);
                    element.append(newElement);
                    $compile(newElement)(scope);
                    
                    scope.close = function(){
                        scope.widgets.splice(scope.widgets.indexOf(scope.item), 1);
                    };
                    
                    scope.settings = function(){
                        var options = {
                            templateUrl: scope.item.widgetSettings.templateUrl,
                            controller: scope.item.widgetSettings.controller,
                            scope: scope
                        };
                        $uibModal.open(options);
                    };
                    
                    scope.iconClicked = function (){};
                }
            };
        }]);
})();
(function(){

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