/**
 * Created by PHI on 3/24/2015.
 */
var process=angular.module('evaluate',[]);
process.controller('list',function($scope,$http){
    $http.get('/api/user/find_evaluate')
        .success(function(data){
            if(data.type=="error"){
                $scope.dgmh_rp=data.content;
            }else{
                data.forEach(function(value){
                    if(!value.hasOwnProperty('ma_lop_thuc_hanh')){
                        var temp=value.ma_lop_mon_hoc;
                        value.ma_lop=temp.ma_danh_gia;
                        value.tiet_bat_dau=temp.tiet_bat_dau;
                        value.tiet_ket_thuc=temp.tiet_ket_thuc;
                        value.thu=temp.thu;
                        value.giang_duong=temp.giang_duong;
                        value.ma_mon=temp.thong_tin_mon.ma_danh_gia;
                        value.ten_mon=temp.thong_tin_mon.ten_mon;
                        value.ma_mon_hoc=temp.thong_tin_mon.ma_mon;
                    }else{
                        var temp=value.ma_lop_thuc_hanh;
                        value.ma_lop=temp.ma_danh_gia;
                        value.tiet_bat_dau=temp.tiet_bat_dau;
                        value.tiet_ket_thuc=temp.tiet_ket_thuc;
                        value.thu=temp.thu;
                        value.giang_duong=temp.giang_duong;
                        value.ma_mon=temp.thong_tin_mon.ma_danh_gia;
                        value.ten_mon=temp.thong_tin_mon.ten_mon;
                        value.ma_mon_hoc=temp.thong_tin_mon.ma_mon;
                    }
                });
                $scope.list=data;
            }
        }).error(function(data){
           console.log(data);
        });
}).controller('create',function($scope,$http){

});