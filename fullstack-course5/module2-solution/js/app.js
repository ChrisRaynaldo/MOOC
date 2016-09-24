(function () {
'use strict';
var itemList = [
	{ name: "chocolates", 	quantity: 10},
	{ name: "apples", 		quantity: 5 },
	{ name: "chicken", 		quantity: 1 },
	{ name: "cereals", 		quantity: 2 },
	{ name: "orange juice",	quantity: 1 }
];

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', tbCtrl)
.controller('AlreadyBoughtShoppingController', bCtrl)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// Controllers
tbCtrl.$inject = ['ShoppingListCheckOffService'];       
function tbCtrl(ShoppingListCheckOffService) { 
	var ctrll = this;
	ctrll.items = itemList; 
	ctrll.empty = false;
	ShoppingListCheckOffService.toBuy = ctrll.items; 
	ctrll.hasBought = function(i){
		ShoppingListCheckOffService.hasBought(i); 
		this.empty = ( ctrll.items.length === 0 );
	}  
}   
bCtrl.$inject = ['ShoppingListCheckOffService'];    
function bCtrl(ShoppingListCheckOffService) { 
	var ctrll = this;
	ctrll.items = [];
	ShoppingListCheckOffService.bought = ctrll.items;  
}    

// Service function
function ShoppingListCheckOffService(){
	var service = this;   
	service.hasBought = function(i){
		service.bought.push(service.toBuy[i]);
		service.toBuy.splice(i, 1); 
	};  
}   
 

})();