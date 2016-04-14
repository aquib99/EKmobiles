
'use strict';

angular.module('ekmobilesapp')
    .controller('OrderCtrl', ['Orders', 'FlashService', '$state', '$sessionStorage', 'ngCart', '$timeout', function (Orders, FlashService, $state, $sessionStorage, ngCart, $timeout) {
        var order = this;
        order.orderdetails = {};
        order.orderdetails.UserID = $sessionStorage.userInfo.userName;

        var values = ngCart.getItems();
        var pItems = [];
        angular.forEach(values, function(item, key) {
           this.push( {
               ProductID: parseInt(item._id) ,
               Quantity: item._quantity,
               })
        }, pItems);

        order.orderdetails.Items = pItems;
        order.orderdetails.Total = ngCart.totalCost();
        order.orderdetails.PaymentInfo = {}
        order.PlaceOrder = PlaceOrder;

        function PlaceOrder() {
            order.dataLoading = true;
            Orders.placeOrder(order.orderdetails)
                .then(function(data) {
                    FlashService.Success('Order Placed successful', true)
                    $timeout(
                        function () {
                            ngCart.empty();
                            $state.go('site.orderSummery');
                        }, 3000);

                }, function(error) {
                    FlashService.Error('Error in placing order : ' + JSON.stringify(error));
                    order.dataLoading = false;
                });
        }
    }]
    )
    
    .controller('orderSummeryCtrl', ['Orders', 'FlashService', '$state', '$sessionStorage', '$timeout', 'ngCart', 'REST_BASE_URL',
        function (Orders, FlashService, $state, $sessionStorage, $timeout, ngCart, REST_BASE_URL) {
        var summery = this;       
        summery.orderSummery = null;
        summery.baseUrl = REST_BASE_URL;
        
        Orders.getOrderSummery().then(function(data) {
            summery.orderSummery = data;
            if (!data) {
                FlashService.Error('Error with order summery')
                $timeout(
                    function () {
                        ngCart.empty();
                        $state.go('site.products');
                    }, 3000);
            }
        });
    }]
    )