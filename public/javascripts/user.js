/**
 * Created by Phi on 3/30/2015.
 */
var user=angular.module('user',[]);
user.controller('timetable',function($scope,$http,$q){
    $http.get('/api/findTheoryClass')
        .success(function(data){
            data.forEach(function(value){
                var mm=value.ma_lop.split(" ")[0];
                $q.all([
                    $http.get('/api/findTheoryInfo/'+value.ma_lop+'/'+value.ghi_chu),
                    $http.get('/api/findSubjectById/'+mm)
                ]).then(function (data){
                    value.tiet_bat_dau=data[0].data.tiet_bat_dau;
                    value.tiet_ket_thuc=data[0].data.tiet_ket_thuc;
                    value.giang_duong=data[0].data.giang_duong;
                    console.log(JSON.stringify(data[0].data));
                });
                //$http.get('/api/findTheoryInfo/'+value.ma_lop+'/'+value.ghi_chu)
                //    .success(function(data){
                //        value.tiet_bat_dau=data[0].tiet_bat_dau;
                //        value.tiet_ket_thuc=data[0].tiet_ket_thuc;
                //        value.giang_duong=data[0].giang_duong;
                //    }).error(function(data){
                //       console.log(err);
                //    });
                //var mm=value.ma_lop.split(" ")[0];
                //$http.get('/api/findSubjectById/'+mm)
                //    .success(function(data){
                //        value.ten_mon=data[0].ten_mon;
                //    }).error(function(data){
                //        console.log(data);
                //    });
            })
            $scope.theories=data;
        }).error(function(data){
            console.log(data);
        });
    $http.get('/api/findPracticeClass')
        .success(function(data){
            //data.forEach(function(value){
            //    $http.get('/api/findPracticeInfo/'+value.ma_lop+'/'+value.ghi_chu)
            //        .success(function(data){
            //            value.tiet_bat_dau=data[0].tiet_bat_dau;
            //            value.tiet_ket_thuc=data[0].tiet_ket_thuc;
            //            value.giang_duong=data[0].giang_duong;
            //        }).error(function(data){
            //            console.log(err);
            //        });
            //});
            //data.forEach(function(value){
            //    var mm=value.ma_lop.split(" ")[0];
            //    $http.get('/api/findSubjectById/'+mm)
            //        .success(function(data){
            //            value.ten_mon=data[0].ten_mon;
            //        }).error(function(data){
            //            console.log(data);
            //        });
            //});
            $scope.practices=data;
        }).error(function(data){
            console.log(data);
        });

});