/**
 * Created by Phi on 2/16/2015.
 */
var process=angular.module('Subject',[]);

process.controller('SubjectController',function($scope,$filter,$http){
    var orderBy = $filter('orderBy');
    $scope.action="add";
    $scope.submit='Thêm môn học';
    $scope.purpose='Thêm môn học';
    $scope.number_page=1;
    $scope.order = function(predicate, reverse) {
        $scope.subjects = orderBy($scope.subjects, predicate, reverse);
    };
    $scope.order('-ma_mon',false);
    $http.get('/admin/subject/api')
        .success(function(data){

            $scope.number_page=data.number_page;
            var showChar = 100;
            var temp=[];
            temp=data.rows;

            //for(var i=0;i<temp.length;i++){
            //    if(temp[i].mota!=''&&temp[i].mota!=undefined)
            //    {
            //        var content = temp[i].mo_ta;
            //        temp[i].mo_ta={};
            //        if (content.length > showChar) {
            //            var c = content.substr(0, showChar);
            //            temp[i].mo_ta.showless=c+' ...';
            //            temp[i].mo_ta.showmore=content;
            //            temp[i].more=false;
            //            temp[i].less=true;
            //        }else{
            //            temp[i].mo_ta.showmore=content;
            //            temp[i].more=true;
            //            temp[i].special=false;
            //        }
            //    }
            //    else{
            //        temp[i].mo_ta={};
            //        temp[i].mo_ta.showmore='';
            //    }
            //}
            $scope.subjects=temp;
        }).error(function(data){
            console.log(data);
        });
    $scope.more=function(data){
        data.less=!data.less;
        data.more=!data.more;
        data.special=!data.special;
    }
    $scope.hasNextPages = function hasNextPages(number) {
        console.log($scope.number_page);
        console.log(number);
        if (typeof $scope.number_page !== 'number' || $scope.number_page < 0)
            throw new Error('express-paginate: `pageCount` is not a number >= 0');
        return number < $scope.number_page;
    };
    $scope.hasPrevPages=function hasPrevPages(number){
        return number>1;
    }
    $scope.setPage=function(n){
        if(n<=3){
            $scope.page_num=n;
            if(n<=3) $scope.page_show=1;
        }else if(n>=$scope.number_page-3){
            $scope.page_num=n;
            if(n>=$scope.number_page-3) $scope.page_show=$scope.number_page-4;
        }
        else{
            $scope.page_num=n;
            $scope.page_show=n-2;
        }
        $http.get('/admin/subject/api?page_num='+$scope.page_num+'&page_length='+$scope.page_length)
            .success(function(data){
                $scope.subjects=data.rows;
                $scope.number_page=data.number_page;
                if($scope.page_num>$scope.number_page){
                    $scope.page_num=$scope.number_page;
                    $scope.page_show=$scope.number_page-4;
                }
                if($scope.page_show+4>$scope.number_page){
                    $scope.page_show=$scope.number_page-4;
                }
                $scope.check();
            }).error(function(data){
                console.log(data);
            });
    }
    $scope.Prev=function(){
        if($scope.page_num-1<1){

        }else{
            $scope.page_num=$scope.page_num-1;
            if($scope.page_num>=2&&$scope.page_num<=$scope.number_page-4){
                $scope.page_show=$scope.page_show-1;
            }else if($scope.page_num-$scope.page_show<0){
                $scope.page_show=$scope.page_num;
            }
        }
        $http.get('/admin/subject/api?page_num='+$scope.page_num+'&page_length='+$scope.page_length)
            .success(function(data){
                $scope.check();
                $scope.subjects=data.rows;
                $scope.number_page=data.number_page;
            }).error(function(data){
                console.log(data);
            });
    }
    $scope.Next=function(){
        if($scope.page_num+1>$scope.number_page){

        }else{
            $scope.page_num=$scope.page_num+1;
            if($scope.page_num>=2&&$scope.page_num<=$scope.number_page-4){
                $scope.page_show=$scope.page_show+1;
            }else if($scope.page_num-$scope.page_show>4){
                $scope.page_show=$scope.page_num-4;
            }
        }
        $http.get('/admin/subject/api?page_num='+$scope.page_num+'&page_length='+$scope.page_length)
            .success(function(data){
                $scope.subjects=data.rows;
                $scope.number_page=data.number_page;
                $scope.check();
            }).error(function(data){
                console.log(data);
            });
    }
    $scope.edit=function(data){
        $scope.purpose='Chỉnh sửa môn học';
        $scope.action='edit';
        $scope.enable=true;
        $scope.submit='Xác nhận chỉnh sửa.';
        $scope.subject=data;
        $scope.subject.change=data.ma_mon;
    }
    $scope.check=function(){
        if($scope.page_show==$scope.page_num){
            $scope.active1='active';
            $scope.active2=$scope.active3=$scope.active4=$scope.active5='';
        }else if($scope.page_num-$scope.page_show==1){
            $scope.active2='active';
            $scope.active1=$scope.active3=$scope.active4=$scope.active5='';
        }else if($scope.page_num-$scope.page_show==2){
            $scope.active3='active';
            $scope.active1=$scope.active2=$scope.active4=$scope.active5='';
        }else if($scope.page_num-$scope.page_show==3){
            $scope.active4='active';
            $scope.active1=$scope.active3=$scope.active2=$scope.active5='';
        }else if($scope.page_num-$scope.page_show==4){
            $scope.active5='active';
            $scope.active1=$scope.active3=$scope.active4=$scope.active2='';
        }
    }
    $scope.check();
    $scope.doAction=function(){
        if($scope.subject){
            if($scope.action=='add'){
                $http.post('/admin/subject/api',{action:$scope.action,subject:$scope.subject})
                    .success(function(data){
                        $scope.rp=data.rp;
                        if(data.type=='error'){
                            $scope.type_rp='color:red';
                        }else{
                            $scope.subject=angular.copy({});
                            $scope.type_rp='color:green';
                        }
                    }).error(function(data){
                        console.log(data);
                    });
            }else if($scope.action=='edit'){
                $http.put('/admin/subject/api',{action:$scope.action,subject:$scope.subject})
                    .success(function(data){
                        $scope.rp=data.rp;
                        if(data.type=='error'){
                            $scope.type_rp='color:red';
                        }else{
                            $scope.subject=angular.copy({});
                            $scope.type_rp='color:green';
                            $scope.enable=false;
                            $scope.action='add';
                            $scope.purpose='Thêm môn học';
                            $scope.submit='Thêm môn';
                        }
                    }).error(function(data){
                        console.log(data);
                    });
            }
        }
    }
    $scope.reset=function(){
        $scope.subject=angular.copy({});
        $scope.enable=false;
        $scope.action='add';
        $scope.purpose='Thêm môn học';
        $scope.submit='Thêm môn';
    };
    $scope.remove=function(data){
        if(window.confirm('Bạn có chắc chắn không?')){
            $http.delete('/admin/subject/api?ma_mon='+data.ma_mon,{})
                .success(function(data){
                    $scope.rp=data.rp;
                    if(data.type=='error'){
                        $scope.type_rp='color:red';
                    }else{
                        $scope.type_rp='color:green';
                    }
                    $http.get('/admin/subject/api')
                        .success(function(data){
                            $scope.subjects=data.rows;
                            $scope.number_page=data.number_page;
                        }).error(function(data){
                            console.log(data);
                        });
                }).error(function(data){
                    console.log(data);
                });
        }
    };

    //$scope.load();
});
