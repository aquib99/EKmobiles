
angular
    .module('ekmobilesapp')
    .factory('products', factory);

factory.$inject = ['$http', '$rootScope', '$q', '$log','REST_BASE_URL'];

function factory($http, $rootScope, $q, $log,REST_BASE_URL) {
    var service = {
        getProducts: getProducts,
        getProduct: getProduct
    };
    return service;

    function getProducts() {
        var promise = $http({ method: 'GET', url: REST_BASE_URL + '/odata/Products' })
            .then(function(response) {
                console.log(response);
                return response.data.value;
            });
        return promise;
    }
    function getProduct(id) {
        var promise = $http({ method: 'GET', url: REST_BASE_URL + '/odata/Products('+ id + ')' })
            .then(function(response) {
                console.log(response);
                return response.data;
            });
        return promise;
    }
}
