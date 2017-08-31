define(['jquery','template','cookie'],function($,template){
    //NProgress.start();
    //NProgress.done();
//控制左侧菜单的折叠和展开
    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });

    $('#logoutBtn').click(function(){
        console.log(123);
        $.ajax({
            type:'post',
            url:'/api/logout',
            dataType:'json',
            success:function(data){
                if(data.code==200){
                    location.href='/main/login';
                }
            }
        })
    });

    var sessionId= $.cookie('PHPSESSID');
   if(!sessionId&&location.pathname!='/main/login'){
       location.href="/main/login";
   }

    //获取登录信息
    var loginInfo= $.cookie('loginInfo');
    var info=loginInfo?JSON.parse(loginInfo):{};

    var tplstr='<div class="avatar img-circle"><img src="{{tc_avatar}}"></div><h4>{{tc_name}}</h4>';
    var html=template.render(tplstr,info);
    $('.aside .profile').html(html);

    //写死了
    //$('.profile img').attr('src',info.tc_avatar);
    //$('.profile h4').html(info.tc_name);

})
