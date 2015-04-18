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
    $http.get('/api/user/find_class')
        .success(function(data){
            $scope.theories = data[0];

            var tenMon = [];
            var maLop = [];
            for(var i = 0 ; i < $scope.theories.length ; i++){
                tenMon[i] = $scope.theories[i].thong_tin_lop.thong_tin_mon.ten_mon;
                maLop[i] = $scope.theories[i].ma_lop;
            }
            $("#subject").autocomplete({
                source : tenMon,
                close: function () {
                    if(check(subject.value)!=undefined){
                        class_id.value = check(subject.value);
                        evaluate_id.value=check2(subject.value);
                    }
                    else{
                        class_id.value = "Không có lớp học này trong thời khóa biểu của bạn!";
                        evaluate_id.value= "Mã không tồn tại!"
                    }
                }
            });
            class_id.onblur=function(){
                if(check(subject.value)!=undefined){
                    class_id.value = check(subject.value);
                    evaluate_id.value=check2(subject.value);
                }
                else{
                    class_id.value = "Không có lớp học này trong thời khóa biểu của bạn!";
                    evaluate_id.value= "Mã không tồn tại!"
                }
            }
            $("#class_id").autocomplete({
                source : maLop
            })
            function check(e){
                for(var i = 0 ; i < $scope.theories.length ; i++){
                    if(e == $scope.theories[i].thong_tin_lop.thong_tin_mon.ten_mon){
                        return $scope.theories[i].ma_lop;
                    }
                }
                return;
            }
            function check2(e){
                for(var i = 0 ; i < $scope.theories.length ; i++){
                    if(e == $scope.theories[i].thong_tin_lop.thong_tin_mon.ten_mon){
                        return $scope.theories[i].thong_tin_lop.ma_danh_gia;
                    }
                }
                return;
            }
        })

    $http.get('/api/findteacher/')
        .success(function(data1){
            var danhsach = [];
            $scope.teachers = data1;
            for(var i = 0 ; i < $scope.teachers.length - 1  ; i++){
                danhsach[i] = $scope.teachers[i].ma_giang_vien + "_" + $scope.teachers[i].ho_va_ten;
            }
            $("#teacher_id" ).autocomplete({
                source:  danhsach,
                close: function() {
                    //console.log()

                    if(teacher_id.value.split("_")[1]!=undefined){
                        name_gv.value = teacher_id.value.split("_")[1];
                    }
                    teacher_id.value = teacher_id.value.split("_")[0];
                }
            });

        })

});
