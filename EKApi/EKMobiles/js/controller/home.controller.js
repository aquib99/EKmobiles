
'use strict';

angular.module('ekmobilesapp')
    .controller('HomeCtrl', ['$state', '$sessionStorage', 'ngCart', 'products', function ($state, $sessionStorage, ngCart, products) {
        var home = this;
       home.slides = [];
	   var pItems = [];
	   home.$products = products.getProducts().then(function (data) {
	       home.values = data;
	       console.log(data);
	   });
        var values = ngCart.getItems();
        console.log(values);
        angular.forEach(values, function(item, key) {
           this.push( {
               image: 'Images/samsung-galaxy-tab.0.jpg' 
               })
        }, pItems);
	home.slides=pItems;
	home.dataLoaded = true;
    }]
    );