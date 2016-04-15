(function(){
	'use strict';
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