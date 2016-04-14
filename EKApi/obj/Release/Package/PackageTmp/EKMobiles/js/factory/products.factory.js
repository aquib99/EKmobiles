
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
                // The then function here is an opportunity to modify the response
                console.log(response);
                // The return value gets picked up by the then in the controller.
                return response.data.value;
            });
        // Return the promise to the controller
        return promise;
    }
    function getProduct(id) {
        var promise = $http({ method: 'GET', url: REST_BASE_URL + '/odata/Products('+ id + ')' })
            .then(function(response) {
                // The then function here is an opportunity to modify the response
                console.log(response);
                // The return value gets picked up by the then in the controller.
                return response.data;
            });
        // Return the promise to the controller
        return promise;
    }
}
