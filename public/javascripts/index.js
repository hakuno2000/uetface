/**
 * Created by Nguyen Le on 3/26/2015.
 */


var index = angular.module('myApp',[]);
index.controller('myCtrl',function($scope,$http){

    var test_msv = false;
    var test_pass = false;
    $scope.isDisabled = true;
    $scope.check_MSV = function(){
        $scope.name = "";
        $scope.lop = "";
        $scope.isDisabled = true;
        test_msv = false;
        if($scope.msv.length < 7){
            $scope.checkMSV = "Mã sinh viên phải có ít nhất 7 chữ số !";
        }
        else if ($scope.msv.length == 8 || $scope.msv.length == 7){
            $scope.checkMSV = "";
            $http.get('/api/findstudentbyid/'+$scope.msv)
                .success(function(data){
                    if(data.type=="error"){
                        $scope.checkMSV = "Mã sinh viên không tồn tại !";
                    }else{
                        var temp = data;
                        $scope.name = temp[0].ho_va_ten;
                        $scope.lop = temp[0].lop_khoa_hoc;
                        test_msv = true;
                        if(test_msv == true && test_pass == true){
                            $scope.isDisabled = false;
                        }
                    }
                });
        }
        else{
            $scope.checkMSV = "";

        }

    }

    $scope.check_pass = function(){
        $scope.isDisabled = true;
        test_pass = false;

        var p1 = /[a-z]/.test($scope.pass);
        if(p1 == false){
            $scope.checkPass = "Mật khẩu cần có chữ cái thường !";

        }
        var p2 = /[A-Z]/.test($scope.pass);
        if(p2 == false){
            $scope.checkPass = "Mật khẩu cần có chữ cái in hoa !";
        }

        var p3 = /[0-9]/.test($scope.pass);
        if(p3 == false){
            $scope.checkPass = "Mật khẩu cần có chữ số !";
        }

        if (p1 == true && p2 == true && p3 == true){
            $scope.checkPass = "";
            test_pass = true;
            if(test_msv == true && test_pass == true){
                $scope.isDisabled = false;
            }
        }

    }

});

