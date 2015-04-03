/**
 * Created by Phi on 3/30/2015.
 */
var user=angular.module('user',[]);
user.controller('timetable',function($scope,$http,$q){
    $http.get('/api/findTheoryClass')
        .success(function(data){
            angular.forEach(data,function(value){
                var mm=value.ma_lop.split(" ")[0];
                $q.all([
                    $http.get('/api/findTheoryInfo/'+value.ma_lop+'/'+value.ghi_chu),
                    $http.get('/api/findSubjectById/'+mm)
                ]).then(function (data){
                    if(!data[0].data[0].type){
                        value.tiet_bat_dau=data[0].data[0].tiet_bat_dau;
                        value.tiet_ket_thuc=data[0].data[0].tiet_ket_thuc;
                        value.giang_duong=data[0].data[0].giang_duong;
                        value.thu=data[0].data[0].thu;
                    }
                    if(!data[1].data[0].type) {
                        value.ten_mon = data[1].data[0].ten_mon;
                    }
                })
            });
            $scope.theories=data;
        }).error(function(data){
            console.log(data);
        });
    $http.get('/api/findPracticeClass')
        .success(function(data){
            angular.forEach(data,function(value){
                var mm=value.ma_lop.split(" ")[0];
                $q.all([
                    $http.get('/api/findPracticeInfo/'+value.ma_lop+'/'+value.ghi_chu),
                    $http.get('/api/findSubjectById/'+mm)
                ]).then(function (data){
                    if(!data[0].data[0].type){
                        value.tiet_bat_dau=data[0].data[0].tiet_bat_dau;
                        value.tiet_ket_thuc=data[0].data[0].tiet_ket_thuc;
                        value.giang_duong=data[0].data[0].giang_duong;
                        value.thu=data[0].data[0].thu;
                    }
                    if(!data[1].data[0].type) {
                        value.ten_mon = data[1].data[0].ten_mon;
                    }
                });
            });
            $scope.theories=data;
        }).error(function(data){
            console.log(data);
        });

});