
angular
    .module('ekmobilesapp')
    .factory('Orders', factory);

factory.$inject = ['$http', '$rootScope', '$q', '$log','REST_BASE_URL'];

function factory($http, $rootScope, $q, $log,REST_BASE_URL) {
    var service = {
        placeOrder: placeOrder,
        getOrderSummery : getOrderSummery
    };
    var orderSummery ;
    return service;
    
    function placeOrder(order) {
        //return $http({ method: 'POST', url: REST_BASE_URL + '/api/Orders', order })
        var req = {
            method: 'POST',
            url: REST_BASE_URL + "/api/Orders",
            data: order
        }
        
        var deferred = $q.defer();
        $http(req)
            .success(function (data) {
                orderSummery = data;
                deferred.resolve(orderSummery);
            }).error(function(msg, code) {
                deferred.reject(msg);
                $log.error(msg, code);
            });
        return deferred.promise;
    }
    
     function getOrderSummery(order) {
         var deferred = $q.defer();
            deferred.resolve(orderSummery);
            return deferred.promise;

            //var promise = $http({ method: 'GET', url: '/app/data/phones.json' })
            //  .then(function (response) {
            //      console.log(response);                 
            //      return response.data;
            //  });
            //return promise;
     }
}
