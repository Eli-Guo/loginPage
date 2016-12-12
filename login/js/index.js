angular.module("myApp",[])
        .service("services",fnService)
        .controller("myCtrl",["$scope","services",function ($scope,services) {

           $scope.user   = "";
           $scope.psw    = "";
           $scope.validc = "";

           $scope.isShow = false;
           $scope.isShowU = false;
           $scope.isShowP = false;

           $scope.showValidateCode = "QNMP";
           $scope.userList = [];
           $scope.loginTo = function () {

                if($scope.validc.toLowerCase() == $scope.showValidateCode.toLowerCase()){
                    var params = {};
                    params.user = $scope.user;
                    params.psw  = $scope.psw;
                    $scope.isShow = false;
                    services.lineService("./line/line.json",params,"GET")
                        .success(function (res) {

                            for(var i = 0; i < res.length; i++){
                                $scope.userList.push(res[i].user)
                            }
                            if($scope.userList.indexOf(params.user) != -1){

                                var idx = $scope.userList.indexOf(params.user);
                                $scope.isShowU = false;

                                if (params.psw == res[idx].psw){
                                    $scope.isShowP = false;
                                    alert("登陆成功");
                                }else {
                                    $scope.isShowP = true;
                                }

                            }else {
                                $scope.isShowU = true;
                            }

                        });

                }else {
                    $scope.isShow = true;
                    $scope.randoms();
                }

           };

           $scope.randoms  = function () {

               var arr = [];

               for (var i=0; i<4; i++){

                   var num = Math.floor(Math.random()*26);
                   arr.push(String.fromCharCode(65+num));

               }

               $scope.showValidateCode = arr.join("");

           }

        }]);


function fnService($http) {

    var urlParams = function (p) {

        var str = "";
        var arr = [];
        for (var j in p){
            str = j + "=" +p[j];
            arr.push(str)
        }
        return arr.join("&");
    };

    var lines = function (url,params,method) {

        method = method.toLowerCase();
        if (method == "get"){
            params = urlParams(params);
            return $http.get(url+"?"+params)
        }else {
            return $http.post(url,params)
        }

    };

    this.lineService = function (url,params,method) {
        return lines(url,params,method)
    }
}

