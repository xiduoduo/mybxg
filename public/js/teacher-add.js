define(['jquery','template','util','datepicker','language','validate'],function($,template,util){
    util.setMenu('/teacher/list');

    var tcId=util.qs('tc_id');
    if(tcId){
        $.ajax({
            type:'get',
            url:'/api/teacher/edit',
            data:{tc_id:tcId},
            dataType:'json',
            success:function(data){
                data.result.operate="编辑讲师";
                var html=template('teacherTpl',data.result);
                $('#teacherInfo').html(html);
                //提交编辑讲师表单
                submitForm('/api/teacher/update');
            }
        });
    }else{
        var html=template('teacherTpl',{operate:"添加讲师",tc_gender:1});
        $('#teacherInfo').html(html);
        //提交添加讲师表单
        submitForm('/api/teacher/add');
    }
    //提交表单共用方法
     function submitForm(url){
         $('#teacherForm').validate({
             sendForm:false,
             valid:function(){
                 //这里应该提交表单
             },
             description:{
                 tc_name:{
                     required:'请输入用户名',
                     valid:'用户名可以使用'
                 },
                 tc_pass:{
                     required:'请输入密码',
                     pattern:'密码必须是6位数字',
                     valid:'密码有效'
                 },
                 tc_join_date:{
                     required:'请输入日期',
                     valid:'日期有效'
                 }
             }
         })
     }
    //function submitForm(url){
    //    $('#teacherBtn').click(function(){
    //        $.ajax({
    //            type:'post',
    //            url:url,
    //            data:$('#teacherForm').serialize(),
    //            dataType:'json',
    //            success:function(data){
    //                if(data.code==200){
    //                    location.href="/teacher/list";
    //                }
    //            }
    //        })
    //    })
    //}
})