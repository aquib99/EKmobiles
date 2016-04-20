
angular.module('ekmobilesapp',
    [
        'ngResource',
        'ui.router',
        //'ngAnimate',
        'ngCart',
        'ngCookies',
        'ngStorage',
        'ui.bootstrap',
        'angular-loading-bar',
        'credit-cards'
    ])

//.constant('REST_BASE_URL', 'http://localhost:61409')
.constant('REST_BASE_URL', 'https://microsoft-apiappf9dd2bcab98e46909f4b22de40382044.azurewebsites.net')

.run(['$rootScope', '$state', '$templateCache', 'AuthenticationService', function ($rootScope, $state, $templateCache, AuthenticationService) {
    $rootScope.$state = $state;
    $(document).on('click', '.navbar-collapse.in', function (e) {
        if ($(e.target).is('a') && $(e.target).attr('class') != 'btn-link ng-binding dropdown-toggle') {
            $(this).collapse('hide');
        }
    });
    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams, options) {
            $templateCache.remove(toState.templateUrl);
            if (toState.access.requiredLogin && !AuthenticationService.isAuthenticated) {
                event.preventDefault();
                $state.go('site.login', { 'returnUrl': toState.name });
            }

        });

}])


.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', 'cfpLoadingBarProvider',
 function ($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider, cfpLoadingBarProvider) {

     cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
     cfpLoadingBarProvider.spinnerTemplate = '<div><img  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />  Loading...';
     $httpProvider.interceptors.push('TokenInterceptor');

     $locationProvider.html5Mode({
         enabled: false,
         requireBase: false
     });
     $urlRouterProvider.otherwise('/');
     $stateProvider

         .state('site', {
             abstract: true,
             url: "/",
             template: "<div ui-view></div>",
             access: { requiredLogin: false }
         })

         .state('site.login', {
             url: "login/:returnUrl",
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
             templateUrl: 'partials/home.view.html',
             controller: "HomeCtrl",
             access: { requiredLogin: false }
         })

         .state('site.products', {
             url: "products",
             controller: "productsCtrl",
             templateUrl: 'partials/products.view.html',
             access: { requiredLogin: false }
         })

         .state('site.details', {
             url: 'product/:productId',
             templateUrl: 'partials/productDetails.view.html',
             controller: 'productDetailCtrl',
             access: { requiredLogin: false }
         })

         .state('site.cart', {
             url: "cart",
             controller: "cart",
             templateUrl: 'partials/cart.html',
             access: { requiredLogin: false }
         })

        .state('site.update', {
            url: "update/:returnUrl",
            controller: "UserAddressCtrl",
            controllerAs: 'vm',
            templateUrl: 'partials/user.address.view.html',
            access: { requiredLogin: true }
        })

         .state('site.checkout', {
             url: "checkout",
             controller: "OrderCtrl",
             controllerAs: 'order',
             templateUrl: 'partials/payment.view.html',
             access: { requiredLogin: true }
         })

         .state('site.orderSummery', {
             url: "orderSummery",
             controller: "orderSummeryCtrl",
             controllerAs: 'summery',
             templateUrl: 'partials/orderSummery.view.html',
             access: { requiredLogin: false }
         })

 }])


.controller('cart', ['ngCart', '$log', '$scope', '$state', function (ngCart, $log, $scope, $state) {

    $scope.httpSettings = {
        url: '/checkout'
    };
    $scope.checkout = function () {
        event.preventDefault();
        $state.go('site.update', { 'returnUrl': 'site.checkout' });
    }
    $scope.ngCartEmpty = ngCart.isEmpty();
    $scope.showCart = function () {

        $log.info('---Total Cost:---');
        $log.info(ngCart.totalCost());
        $log.info('---Items in Cart:---');
        $log.info(ngCart.getItems());

    }

}])
.controller('navigation', ['$scope', '$state', function ($scope, $state) {


}])
.directive('rainbowBlock', function () {

    return {
        restrict: 'A',
        link: function (el) {
            Rainbow.color();
        }
    };
})
.directive('showWhen', ['$window', function ($window) {


    return {
        restrict: 'A',
        link: function ($scope, $element, $attr) {

            function checkExpose() {
                var mq = $attr.showWhen == 'large' ? '(min-width:768px)' : $attr.showWhen;
                if ($window.matchMedia(mq).matches) {
                    $element.removeClass('ng-hide');
                } else {
                    $element.addClass('ng-hide');
                }
            }

            function onResize() {
                checkExpose();
            }

            checkExpose();

            //$window.on('resize', onResize, $window);
            angular.element($window).bind('resize', function () {
                onResize();
            })

            

        }
    };
}]);

