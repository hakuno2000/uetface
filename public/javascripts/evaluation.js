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
            $scope.mon_hoc=function(){
                suggest_mon.style.display = "block";
                var patt = new RegExp($scope.subject);
                if($scope.subject.length > 0){
                    //console.log($scope.theories[0].ma_lop);
                    sug_mon.innerHTML = '';
                    for(var i = 0 ; i < $scope.theories.length ; i++){
                        if(patt.test($scope.theories[i].thong_tin_lop.thong_tin_mon.ten_mon.toLowerCase()) || patt.test($scope.theories[i].thong_tin_lop.thong_tin_mon.ten_mon)){
                            var li = document.createElement("li");
                            li.innerHTML = $scope.theories[i].thong_tin_lop.thong_tin_mon.ten_mon;
                            sug_mon.appendChild(li);
                            li.onclick = function(){
                                subject.value = this.innerHTML;
                                teacher_Name.value = check(this.innerHTML);
                                suggest_mon.style.display="none";
                            }
                        }
                    }
                }
                else{
                    suggest_mon.style.display="none";
                }
                function check(ck){
                    for(var i = 0 ; i < $scope.theories.length ; i++){
                        if(ck == $scope.theories[i].thong_tin_lop.thong_tin_mon.ten_mon){
                            return $scope.theories[i].ma_lop;
                        }
                    }
                }
            }
        })

    $http.get('/api/findteacher/')
        .success(function(data1){

            $scope.teachers = data1;
            for(var i = 0 ; i < $scope.teachers.length - 1  ; i++){
                for(var j = i + 1 ; j < $scope.teachers.length ; j++){
                    if($scope.teachers[i].ho_va_ten == $scope.teachers[j].ho_va_ten){
                        $scope.teachers.splice(j,1);
                    }
                }
            }

            $scope.tea_name=function(){
                name_gv.style.display='none';
                suggest_teacher.style.display = 'block';
                if($scope.giang_vien.length > 0){
                    sug_tea.innerHTML = '';
                    var patt_teacher = new RegExp($scope.giang_vien);
                    for(var i = 0 ; i < $scope.teachers.length ; i++){
                        if(patt_teacher.test($scope.teachers[i].ho_va_ten) || patt_teacher.test($scope.teachers[i].ho_va_ten.toLowerCase()) || patt_teacher.test($scope.teachers[i].ma_giang_vien)){
                            var li = document.createElement("li");
                            li.innerHTML = $scope.teachers[i].ma_giang_vien + "_" + $scope.teachers[i].ho_va_ten;
                            sug_tea.appendChild(li);
                            li.onclick = function(){
                                var magv = this.innerHTML.split("_");
                                var maso = magv[0];
                                name_gv.style.display='block';
                                name_gv.value = magv[1];
                                student_Name.value = maso;
                                suggest_teacher.style.display="none";
                            }
                        }
                    }
                }
                else {
                    suggest_teacher.style.display='none';
                }

            }

        })

});
