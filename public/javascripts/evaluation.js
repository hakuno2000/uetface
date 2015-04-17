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
                source : tenMon
            })
            $("#teacher_Name").autocomplete({
                source : maLop
            })
            
        })

    $http.get('/api/findteacher/')
        .success(function(data1){
            var danhsach = [];
            $scope.teachers = data1;
            for(var i = 0 ; i < $scope.teachers.length - 1  ; i++){
                danhsach[i] = $scope.teachers[i].ma_giang_vien + "_" + $scope.teachers[i].ho_va_ten;
            }
            $("#student_Name" ).autocomplete({
                source:  danhsach
            });
            name_gv.style.display='none';
            student_Name.onkeydown = function(e) {
                if (e.keyCode == 13) {
                    //console.log()
                    var magv = student_Name.value.split("_");
                    var maso = magv[0];
                    name_gv.style.display = 'block';
                    name_gv.value = magv[1];
                    student_Name.value = maso;

                    return false;
                }
                else{
                    name_gv.style.display='none';
                }
            }
            student_Name.onclick = function(){
                if(student_Name.value.length > 5){
                        var magv = student_Name.value.split("_");
                        var maso = magv[0];
                        name_gv.style.display = 'block';
                        name_gv.value = magv[1];
                        student_Name.value = maso;
                }

            }

        })

});
