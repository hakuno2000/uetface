/**
 * Created by PHI on 3/24/2015.
 */
var process=angular.module('evaluate',['ui.bootstrap']);
process.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, ans) {

    $scope.items = items;
    $scope.answers=[];
    for(var i=0;i<18;i++){
        $scope.answers[i]=ans["q"+(i+1)];
    }
    $scope.data=ans;
    console.log(ans);

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
process.controller('list',function($scope,$http,$log,$modal){
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
    $scope.items = [
        'Giảng đường đáp ứng nhu cầu của môn học.',
        'Các thiết bị tại giảng đường đáp ứng nhu cầu giảng dạy và học tập.',
        'Bạn được hỗ trợ kịp thời trong quá trình học môn này.',
        'Mục tiêu của môn học nêu rõ kiến thức và kĩ năng người học cần đạt được.',
        'Thời lượng môn học được phân bổ hợp lí cho các hình thức học tập.',
        'Các tài liệu phục vụ môn học được cập nhật.',
        'Môn học góp phần trang bị kiến thức, kĩ năng nghề nghiệp cho bạn.',
        'Giảng viên hướng dẫn cho bạn phương pháp học tập khi bắt đầu môn học.',
        'Phương pháp giảng dạy của giảng viên giúp bạn phát triển tư duy phê phán',
        'Giảng viên tạo cơ hội để bạn chủ động tham gia vào quá trình học tập',
        'Giảng viên giúp bạn phát triển kĩ năng làm việc độc lập',
        'Giảng viên rèn luyện cho bạn phương pháp liên hệ giữa các vấn đề trong môn học với thực tiễn',
        'Giảng viên sử dụng hiệu quả phương tiện dạy học',
        'Giảng viên quan tâm giáo dục tư cách, phẩm chất nghề nghiệp của người học',
        'Bạn hiểu những vấn đề được truyền tải trên lớp ',
        'Kết quả học tập của người học được đánh giá bằng nhiều hình thức phù hợp với tính chất và đặc thù môn học',
        'Nội dung kiểm tra đánh giá tổng hợp được các kiến thức và kĩ năng mà người học phải đạt được theo yêu cầu',
        'Thông tin phản hồi từ kiểm tra đánh giá giúp bạn cải thiện kết quả học tập'
    ];
    $scope.openView = function (size,data) {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                },
                ans: function(){
                    return data;
                }
            }
        });
        modalInstance.result.then(function () {

        }, function () {

        });
    };
}).controller('create',function($scope,$http){
    $scope.createEval=function() {
        $scope.add=!$scope.add;
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
    }

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
