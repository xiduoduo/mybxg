define(['jquery','cookie'],function($){
    $('#login').click(function(){
        var formdata=$('#loginform').serialize();
        console.log(formdata);
        $.ajax({
            url:'/api/login',
            type:'post',
            data:$('#loginform').serialize(),
            dataType:'json',
            success:function(data ){
                if(data.code==200){
                    $.cookie('loginInfo',JSON.stringify(data.result),{path:'/'});
                    location.href='/main/index'
                }else{
                    alert('用户名或密码错误');
                }
            }
        });
        return false;
    })
})