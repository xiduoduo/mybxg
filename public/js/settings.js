define(['jquery','template','util','ckeditor','uploadify','datepicker','language','region','validate','form'],function($,template,util,CKEDITOR){
    //设置导航菜单选中
    util.setMenu('/main/index');
    $.ajax({
        type:'get',
        url:'/api/teacher/profile',
        dataType:'json',
        success:function(data){
            var html=template('settingsTpl',data.result);
            $('#settingsInfo').html(html);
            //处理头像上传
            $('#upfile').uploadify({
                width:120,
                height:120,
                buttonText:'',
                itemTemplate:'<span></span>',
                swf:'/public/assets/uploadify/uploadify.swf',
                uploader:'/api/uploader/avatar',
                fileObjName:'tc_avatar',
                onUploadSuccess:function(f,data){
                    var data=JSON.parse(data);
                    console.log(data);
                    $('.preview img').attr('src',data.result.path)
                }

            });
            $('#pcd').region({
                url:'/public/assets/jquery-region/region.json'
            });
            //处理富文本
            CKEDITOR.replace('ckeditor',{
                toolbarGroups:[
                    { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
                    { name: 'links', groups: [ 'links' ] },
                    { name: 'clipboard', groups: [ 'clipboard', 'undo' ] }
                ]
            });
            //处理表单提交
            $('#settingsForm').validate({
                sendFrom:false,
                valid:function(){
                    for(var instance in CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }
                    var p=$('#p options:selected').text();
                    var c=$('#c options:selected').text();
                    var d=$('#d options:selected').text();
                    var hometown=p+'|'+c+'|'+d;
                    $(this).ajaxSubmit({
                        type:'post',
                        url:'/api/teacher/modify',
                        data:{tc_hometown:hometown},
                        dataType:'json',
                        success:function(data){
                            if(data.code==200){
                                location.reload();
                            }
                        }
                    })
                }
            })
        }
    })
})
