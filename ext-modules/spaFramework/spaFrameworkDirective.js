(function(){
	'use strict';
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