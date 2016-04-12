
angular.module('ekmobilesapp', 
    [
        'ngResource', 
        'ui.router', 
        'ngAnimate', 
        'ngCart',
        'ngCookies',
        'ngStorage', 
        'ui.bootstrap', 
        'angular-loading-bar',
        'credit-cards'
        ])
        
.constant('REST_BASE_URL', 'http://localhost:61409')
.run (['$rootScope', '$state', '$templateCache', 'AuthenticationService', function($rootScope, $state, $templateCache, AuthenticationService){
    $rootScope.$state = $state;
   
   $rootScope.$on('$stateChangeStart', 
function(event, toState, toParams, fromState, fromParams, options){ 
        $templateCache.remove(toState.templateUrl);
        if (toState.access.requiredLogin && !AuthenticationService.isAuthenticated) {
            event.preventDefault();
             $state.go('site.login', {'toState': toState.name, 'toParams': toParams});
            }
        });
        
    }])
    

.config(['$locationProvider', '$stateProvider', '$urlRouterProvider','$httpProvider', 'cfpLoadingBarProvider',
 function($locationProvider, $stateProvider, $urlRouterProvider,$httpProvider, cfpLoadingBarProvider) {
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });
    
    $httpProvider.interceptors.push('TokenInterceptor');  
    //$httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    //$httpProvider.defaults.transformRequest.unshift(function (data, headersGetter) {
    //    var key, result = [];

    //    if (typeof data === "string")
    //        return data;

    //    for (key in data) {
    //        if (data.hasOwnProperty(key))
    //        result.push(encodeURIComponent(key) + "=" + data[key]);
    //    }
    //    return result.join("&");
    //});  
    $urlRouterProvider.otherwise('/');
    $stateProvider

        .state('site', {
            abstract: true,
            url: "/",            
            template: "<div ui-view></div>",
            access: { requiredLogin: false }
        })
        
        .state('site.login', {
            url: "login",
            controller: "AdminUserCtrl",
            templateUrl: 'partials/auth.login.view.html',
            access: { requiredLogin: false }
        })

        .state('site.register', {
                url: "register",
                controller: 'RegisterController',
                controllerAs: 'vm',
                templateUrl: 'partials/auth.register.view.html',
                access: { requiredLogin: false }
        })
            
        .state('site.index', {
            url: "",
            templateUrl: 'partials/index.html',
            access: { requiredLogin: false }
        })
                
        .state('site.products', {
            url: "products",
            controller: "main",
            templateUrl: 'partials/products.view.html',
            access: { requiredLogin: false }
        })
        
        .state('site.details', {
            url: 'product/:productId',
            templateUrl: 'partials/productDetails.view.html',
            controller:'productDetailCtrl',
            access: { requiredLogin: false }
        })
        
        .state('site.cart', {
            url: "cart",
            controller: "cart",
            templateUrl: 'partials/cart.html',
            access: { requiredLogin: false }
        }) 
               
        .state('site.checkout', {
            url: "checkout",
            controller: "OrderCtrl",
            controllerAs: 'order',
            templateUrl: 'partials/payment.view.html',
            access: { requiredLogin: true }
        })
        
        .state('site.update', {
            url: "update",
            controller: "UserAddressCtrl",
            controllerAs: 'vm',
            templateUrl: 'partials/user.address.view.html',
            access: { requiredLogin: true }
        })

        .state('site.docs', {
            url: "docs",
            templateUrl: 'partials/docs.html',
            access: { requiredLogin: false }
        })


}])
   

.controller('cart',['ngCart', '$log', '$scope', '$state', function (ngCart,$log, $scope, $state) {

        $scope.httpSettings = {
            url:'/checkout'
        };

        $scope.payPalSettings ={ paypal:{
            business:'dan@snapjay.com',
            item_name:'Order',
            item_number:'item_number',
            currency_code:'CAD'
        }};
         $scope.checkout = function(){
             event.preventDefault();
            $state.go('site.update');
        }   

    $scope.showCart = function(){

        $log.info ('---Total Cost:---');
        $log.info (ngCart.totalCost());
        $log.info ('---Items in Cart:---');
        $log.info (ngCart.getItems());

    }

}])
    .directive('rainbowBlock', function () {

    return {
        restrict: 'A',
        link: function(el) {
            Rainbow.color();
        }
    };
})
.filter('yesNo', function () {
  return function (boolean) {
    return boolean ? 'Yes' : 'No';
  }
})



