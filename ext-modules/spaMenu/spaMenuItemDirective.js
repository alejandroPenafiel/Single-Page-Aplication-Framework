(function(){
	'use strict';
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