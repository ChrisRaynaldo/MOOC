(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', lcCtrl);

lcCtrl.$inject = ['$scope'];
    
function lcCtrl($scope) {
    $scope.input="";
    $scope.message;
    $scope.checkList = function(){  
        var tmpMsg = $scope.input.split(","), 
            counter = 0;  
        for (var i = 0; i < tmpMsg.length; i++) {
            if( tmpMsg[i] != "" && tmpMsg[i] != " " ) counter++;
        }
        if( counter === 0 ) {
            $scope.message = "Please enter data first";              
            chngClrs("red");
        }
        else if( counter > 3 ){ 
            $scope.message = "Too much!";             
            chngClrs("green");
        }
        else {
            $scope.message = "Enjoy!"; 
            chngClrs("green");
        }
        return;
    };
}    
    
function chngClrs( clr ){
    document.getElementsByClassName("form-group message")[0].style="color: "+clr+"; border: 1px solid "+clr+"; padding: .5em";
}

})();