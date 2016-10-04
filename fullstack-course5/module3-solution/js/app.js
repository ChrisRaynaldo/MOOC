(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItemsDirective)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

function foundItemsDirective(){
  var ddo = {
    templateUrl: 'foundItems.html',
    // template: '<ul><li ng-repeat="item in list.found">  {{ item.name }} | {{ item.short_name }} | {{ item.description }}  <button ng-click="list.onRemove({index: $index});">Dont want this one!</button>  </li>  </ul>',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: NarrowItDownDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function NarrowItDownDirectiveController(){
  var list = this;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var target = this
    target.found;
    target.searchTerm;
    target.clicked = false;
    target.noResult = function(){
      return target.found && !target.found.length && target.clicked;
    },
    target.getSearchedItems = function(){
      if (typeof target.searchTerm !== "undefined") {
        var promise = MenuSearchService.getMatchedMenuItems(target.searchTerm);
        promise.then(function(value){
          if(value.lenth == 0) {
            target.found = [];
            target.clicked = true;
            return;
          }
          target.found = value;
        });
      } else {
        target.found = [];
        target.clicked = true;
      }
    },
    target.removeItem = function(index){
      target.found.splice(index,1);
    }
    target.clearMsg = function(){
      target.clicked = false;
    };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
        var foundItems = [];
          result.data["menu_items"].forEach(function(currentItem, index) {
            if(currentItem.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
              foundItems.push(currentItem);
            }
          });

        return foundItems;
    });

  };
}

})();
