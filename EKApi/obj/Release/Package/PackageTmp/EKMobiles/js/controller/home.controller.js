
'use strict';

angular.module('ekmobilesapp')
    .controller('HomeCtrl', ['$state', '$scope', '$sessionStorage', 'ngCart', 'products', 'REST_BASE_URL', '$animate', function ($state, $scope, $sessionStorage, ngCart, products, REST_BASE_URL,$animate) {
        $animate.enabled(true);
        $scope.myInterval =3000;
        $scope.slides = [];
	   var pItems = [];
	   $scope.$products = products.getProducts().then(function (data) {
	       $scope.values = data;
	       angular.forEach($scope.values, function (item, key) {
	           this.push({
	               image: REST_BASE_URL + item.ImageURL,
	               id: item.Id,
	               description: item.Description,
	               model: item.Model,
	               price: item.Price
	           })
	       }, pItems);
	       $scope.slides = pItems;
	   });	   
    }]
     )

.directive('disableAnimation', function($animate){
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs){
            $attrs.$observe('disableAnimation', function(value){
                $animate.enabled(!value, $element);
            });
        }
    }
})