(function(){
	'use strict';
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