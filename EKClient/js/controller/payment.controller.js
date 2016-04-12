
'use strict';

angular.module('ekmobilesapp')
    .controller('OrderCtrl', ['Orders', 'FlashService', '$state', '$sessionStorage', 'ngCart', function(Orders, FlashService, $state, $sessionStorage, ngCart) {
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
                .success(function(data) {
                    FlashService.Success('Order Placed successful')
                    $timeout(
                        function() {
                            $state.go('site.index');
                        }, 3000);


                }).error(function(status, data) {
                    FlashService.Error('Error in placing order : ' + JSON.stringify(status));
                    order.dataLoading = false;
                });
        }
    }]
    );