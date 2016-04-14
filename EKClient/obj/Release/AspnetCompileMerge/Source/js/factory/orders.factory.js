
angular
    .module('ekmobilesapp')
    .factory('Orders', factory);

factory.$inject = ['$http', '$rootScope', '$q', '$log','REST_BASE_URL'];

function factory($http, $rootScope, $q, $log,REST_BASE_URL) {
    var service = {
        placeOrder: placeOrder
    };
    return service;

    function placeOrder(order) {
        //return $http({ method: 'POST', url: REST_BASE_URL + '/api/Orders', order })
        var req = {
            method: 'POST',
            url: REST_BASE_URL + "/api/Orders",
            data: order
        }

        return $http(req);
    }
}
