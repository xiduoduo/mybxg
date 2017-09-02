define(['jquery','template','util','datepicker','language'],function($,template,util){
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
        $('#teacherBtn').click(function(){
            $.ajax({
                type:'post',
                url:url,
                data:$('#teacherForm').serialize(),
                dataType:'json',
                success:function(data){
                    if(data.code==200){
                        location.href="/teacher/list";
                    }
                }
            })
        })
    }
})