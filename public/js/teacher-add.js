define(['jquery','template','util'],function($,template,util){
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
            }
        });
    }else{
        var html=template('teacherTpl',{operate:"添加讲师",tc_gender:1});
        $('#teacherInfo').html(html);
    }
})