

angular
    .module('ekmobilesapp')
    .controller('main', ['$http', '$filter', 'ngCart', '$scope', 'products','REST_BASE_URL', function($http, $filter, ngCart, $scope, products,REST_BASE_URL) {
        $scope.baseUrl = REST_BASE_URL;
        ngCart.setShipping(10.99);
        ngCart.setTaxRate(13);
        $scope.useBrands = [];

        $scope.$products = products.getProducts().then(function(data) {
            $scope.products = data;
            $scope.group = $filter('groupBy')($scope.products, 'Brand');
        });
        $scope.filterBrands = function() {
            return function(p) {
                for (var i in $scope.products) {
                    if (p.Brand == $scope.group[i] && $scope.useBrands[i]) {
                        return true;
                    }
                }
            };
        };

    }])
    .filter('groupBy',
    function() {
        var uniqueItems = function(data, key) {
            var result = new Array();
            for (var i = 0; i < data.length; i++) {
                var value = data[i][key];

                if (result.indexOf(value) == -1) {
                    result.push(value);
                }
            }
            return result;
        };
        return function(collection, key) {
            if (collection === null) return;
            return uniqueItems(collection, key);
        };
    })
    .controller('productDetailCtrl', ['$scope', '$stateParams', 'products', 'REST_BASE_URL',
        function ($scope, $stateParams, products, REST_BASE_URL) {
            $scope.baseUrl = REST_BASE_URL;
            products.getProduct($stateParams.productId).then(function(data) {
                $scope.product = data;
            });
        }]);